import { isAdmin } from "./admin-auth";
import LOGS from "./logs";

export default function handler(req, res) {
  if (!isAdmin(req)) return res.status(401).json({ error: "Unauthorized" });
  res.json(LOGS);
}
