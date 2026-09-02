// Vercel serverless function: POST /api/contact
import { sendContact } from "../server/send-contact.js";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed" });
  }

  const payload =
    typeof req.body === "string" ? JSON.parse(req.body || "{}") : req.body ?? {};
  const { status, body } = await sendContact(payload);
  return res.status(status).json(body);
}
