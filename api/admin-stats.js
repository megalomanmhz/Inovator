import { isAdmin } from "./admin-auth";
import STATS from "./stats";

export default function handler(req, res) {
  if (!isAdmin(req)) return res.status(401).json({ error: "Unauthorized" });
  res.json(STATS);
}
