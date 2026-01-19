export default async function handler(req, res) {
  const { lat, lng } = req.query;
  const r = await fetch(
    `https://api.aladhan.com/v1/timings?latitude=${lat}&longitude=${lng}&method=11`
  );
  const j = await r.json();
  res.json(j.data.timings);
}
