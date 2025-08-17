import Summary from "../models/Summary.js";
import { generateSummary } from "../services/ai.js";
import { createTransportFromEnv, sendSummaryEmail } from "../services/mailer.js";

export async function summarize(req, res) {
  try {
    const { instruction, transcript } = req.body;
    if (!instruction || !transcript) {
      return res.status(400).json({ error: "instruction and transcript are required" });
    }

    const summaryText = await generateSummary({
      apiKey: process.env.GROQ_API_KEY,
      instruction,
      transcript
    });

    const doc = await Summary.create({
      instruction,
      transcript,
      summary: summaryText,
      recipients: []
    });

    return res.json({ id: doc._id, summary: doc.summary, createdAt: doc.createdAt });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: err.message });
  }
}

export async function getSummary(req, res) {
  try {
    const doc = await Summary.findById(req.params.id);
    if (!doc) return res.status(404).json({ error: "Not found" });
    return res.json(doc);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}

export async function share(req, res) {
  try {
    const { id, editedSummary, recipients, subject } = req.body;
    if (!id || !editedSummary || !Array.isArray(recipients) || recipients.length === 0) {
      return res.status(400).json({ error: "id, editedSummary, recipients[] required" });
    }

    const doc = await Summary.findById(id);
    if (!doc) return res.status(404).json({ error: "Summary not found" });

    doc.summary = editedSummary;
    doc.recipients = recipients;
    doc.emailedAt = new Date();
    await doc.save();

    const transporter = createTransportFromEnv();
    const html = `
      <div style="font-family:Arial,sans-serif">
        <h2>Meeting Summary</h2>
        <pre style="white-space:pre-wrap">${editedSummary.replace(/</g, "&lt;")}</pre>
        <hr/>
        <small>Generated via AI Summarizer</small>
      </div>
    `;

    await sendSummaryEmail({
      transporter,
      from: process.env.SMTP_USER,
      to: recipients.join(","),
      subject: subject || "Meeting Summary",
      html
    });

    return res.json({ ok: true, emailedAt: doc.emailedAt });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: err.message });
  }
}
