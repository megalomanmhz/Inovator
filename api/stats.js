let STATS = {
  totalChat: 0,
  perHari: {}
};

export function hit() {
  STATS.totalChat++;
  const d = new Date().toISOString().slice(0,10);
  STATS.perHari[d] = (STATS.perHari[d] || 0) + 1;
}

export default function handler(req, res) {
  res.json(STATS);
}
