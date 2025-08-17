// ai.js
export async function generateSummary({ apiKey, instruction, transcript }) {
  const sys = `You are an assistant that turns raw meeting transcripts into clear, structured summaries.
Rules:
- Follow the user's instruction exactly.
- Be concise. Use bullet points and headings when appropriate.
- If the transcript lacks info, say so briefly.
- Highlight action items with assignees and due dates if mentioned.`;

  const user = `Instruction: ${instruction}
Transcript:
${transcript}`;

  const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${apiKey}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model: "llama-3.1-8b-instant",   // ✅ updated model
      messages: [
        { role: "system", content: sys },
        { role: "user", content: user }
      ],
      temperature: 0.2,
      max_tokens: 1200
    })
  });

  if (!res.ok) {
    const txt = await res.text();
    throw new Error(`AI provider error: ${res.status} ${txt}`);
  }

  const data = await res.json();
  return data.choices?.[0]?.message?.content?.trim() ?? "";
}
