export function isAdmin(req) {
  const key = req.headers["x-admin-key"];
  return key && key === process.env.ADMIN_PASSWORD;
}
