import { rateLimit } from "./rate-limit";
import { saveLog } from "./logs";
import { hit } from "./stats";
import { getConfig } from "./admin-config";

const TOPIK = ["doa","shalat","wudhu","fiqih","ibadah","masjid"];

export default async function handler(req, res) {
  if (req.method !== "POST")
    return res.status(405).json({ reply: "Method not allowed" });

  const ip = req.headers["x-forwarded-for"] || "anon";
  if (!rateLimit(ip))
    return res.json({ reply: "Terlalu banyak permintaan 🙏" });

  const { message, masjid } = req.body;
  if (!message)
    return res.json({ reply: "Pesan kosong." });

  if (!TOPIK.some(t => message.toLowerCase().includes(t)))
    return res.json({ reply: "Ustaz AI hanya menjawab fiqih & doa 🙏" });

  const cfg = getConfig();
  const gaya =
    cfg.mode === "pesantren"
      ? "Gunakan gaya edukatif santri."
      : "Jawab singkat dan sopan.";

  const r = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: [{ text: message }] }],
        systemInstruction: {
          parts: [{
            text: `Kamu adalah Ustaz AI Ahlussunnah. ${gaya} Lokasi: ${masjid || "-"}.`
          }]
        }
      })
    }
  );

  const j = await r.json();
  const reply =
    j?.candidates?.[0]?.content?.parts?.[0]?.text ||
    "Maaf, belum ada jawaban.";

  saveLog({ ip, message, reply });
  hit();

  res.json({ reply });
}
