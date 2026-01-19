let LOGS = [];

export function saveLog(data) {
  LOGS.push({ ...data, time: new Date().toISOString() });
  if (LOGS.length > 1000) LOGS.shift();
}

export default function handler(req, res) {
  res.json(LOGS);
}
