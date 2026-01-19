import { getConfig } from "./admin-config";

export default function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ ok: false });
  }

  const { code } = req.body;
  if (!code) {
    return res.json({ ok: false });
  }

  const cfg = getConfig();
  const valid = cfg.ustazVouchers.includes(code);

  res.json({ ok: valid });
    }
