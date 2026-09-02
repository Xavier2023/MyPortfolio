// Netlify function. /api/contact is mapped here by public/_redirects.
import { sendContact } from "../../server/send-contact.js";

export default async (request) => {
  if (request.method !== "POST") {
    return Response.json({ error: "Method not allowed" }, { status: 405 });
  }

  const payload = await request.json().catch(() => ({}));
  const { status, body } = await sendContact(
    payload,
    typeof Netlify !== "undefined" ? Netlify.env.toObject() : process.env
  );
  return Response.json(body, { status });
};
