const DOA = [
  "Allahummaftah li abwaba rahmatik.",
  "Allahumma inni as'aluka min fadhlik.",
  "Astaghfirullah, Allahumma antas salam."
];

export default function handler(req, res) {
  const i = new Date().getDate() % DOA.length;
  res.json({ doa: DOA[i] });
}
