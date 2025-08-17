import React, { useState } from "react";

const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:8080/api";

export default function App() {
  const [instruction, setInstruction] = useState("Summarize in bullet points and highlight action items");
  const [transcript, setTranscript] = useState("");
  const [fileName, setFileName] = useState("");
  const [loading, setLoading] = useState(false);

  const [summaryId, setSummaryId] = useState(null);
  const [summary, setSummary] = useState("");

  const [recipients, setRecipients] = useState("");
  const [shareLoading, setShareLoading] = useState(false);
  const [message, setMessage] = useState("");

  async function onFileChange(e) {
    const f = e.target.files?.[0];
    if (!f) return;
    setFileName(f.name);
    const text = await f.text();
    setTranscript(text);
  }

  async function generate() {
    setMessage("");
    if (!instruction || !transcript) {
      alert("Please provide both instruction and transcript.");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/summarize`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ instruction, transcript })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed");
      setSummaryId(data.id);
      setSummary(data.summary);
    } catch (e) {
      alert(e.message);
    } finally {
      setLoading(false);
    }
  }

  async function share() {
    setMessage("");
    const emails = recipients.split(",").map(s => s.trim()).filter(Boolean);
    if (!summaryId || !summary || emails.length === 0) {
      alert("Need a summary, its id, and at least one recipient email.");
      return;
    }
    setShareLoading(true);
    try {
      const res = await fetch(`${API_BASE}/share`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: summaryId,
          editedSummary: summary,
          recipients: emails,
          subject: "Meeting Summary"
        })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Share failed");
      setMessage("✅ Email sent!");
    } catch (e) {
      setMessage("❌ " + e.message);
    } finally {
      setShareLoading(false);
    }
  }

  return (
    <div style={{ maxWidth: 900, margin: "24px auto", fontFamily: "system-ui" }}>
      <h1>AI Meeting Summarizer</h1>

      <section style={{ padding: 12, border: "1px solid #ccc", marginBottom: 12 }}>
        <label>Custom Instruction/Prompt</label>
        <textarea
          value={instruction}
          onChange={e => setInstruction(e.target.value)}
          rows={3}
          style={{ width: "100%" }}
          placeholder='e.g., "Summarize in bullet points for executives"'
        />

        <div style={{ marginTop: 12 }}>
          <label>Transcript</label>
          <textarea
            value={transcript}
            onChange={e => setTranscript(e.target.value)}
            rows={10}
            style={{ width: "100%" }}
            placeholder="Paste transcript here..."
          />
          <div style={{ marginTop: 8 }}>
            <input type="file" accept=".txt" onChange={onFileChange} />
            {fileName && <small> Loaded: {fileName}</small>}
          </div>
        </div>

        <button onClick={generate} disabled={loading} style={{ marginTop: 12 }}>
          {loading ? "Generating..." : "Generate Summary"}
        </button>
      </section>

      {summary && (
        <section style={{ padding: 12, border: "1px solid #ccc", marginBottom: 12 }}>
          <label>Editable Summary</label>
          <textarea
            value={summary}
            onChange={e => setSummary(e.target.value)}
            rows={12}
            style={{ width: "100%", fontFamily: "monospace" }}
          />
        </section>
      )}

      {summary && (
        <section style={{ padding: 12, border: "1px solid #ccc" }}>
          <label>Recipients (comma-separated)</label>
          <input
            type="text"
            value={recipients}
            onChange={e => setRecipients(e.target.value)}
            placeholder="alice@example.com, bob@acme.com"
            style={{ width: "100%" }}
          />
          <button onClick={share} disabled={shareLoading} style={{ marginTop: 12 }}>
            {shareLoading ? "Sending..." : "Share via Email"}
          </button>
          {message && <p style={{ marginTop: 8 }}>{message}</p>}
        </section>
      )}
    </div>
  );
}
