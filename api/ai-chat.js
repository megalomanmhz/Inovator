export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { message } = req.body;
    if (!message) {
      return res.status(400).json({ reply: "Pesan kosong." });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return res.status(500).json({ reply: "API Key Gemini belum diset." });
    }

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [
            {
              role: "user",
              parts: [{ text: message }]
            }
          ],
          systemInstruction: {
            parts: [
              {
                text:
                  "Kamu adalah Ustaz AI. Jawab dengan sopan, singkat, jelas, dan sesuai ajaran Islam Ahlussunnah wal Jamaah."
              }
            ]
          }
        })
      }
    );

    const data = await response.json();

    const reply =
      data?.candidates?.[0]?.content?.parts?.[0]?.text ||
      "Maaf, Ustaz AI belum mendapatkan jawaban saat ini.";

    res.status(200).json({ reply });

  } catch (err) {
    console.error(err);
    res.status(500).json({
      reply: "Terjadi kesalahan saat memproses jawaban."
    });
  }
}
