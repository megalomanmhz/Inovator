let CONFIG = {
  ustazVouchers: ["USTAZ-IKHLAS-01"],
  mode: "public" // public | masjid | pesantren
};

export function getConfig() {
  return CONFIG;
}

export default function handler(req, res) {
  const key = req.headers["x-admin-key"];
  if (req.method === "GET") return res.json(CONFIG);
  if (key !== process.env.ADMIN_PASSWORD)
    return res.status(401).json({ error: "Unauthorized" });

  CONFIG = { ...CONFIG, ...req.body };
  res.json(CONFIG);
}
