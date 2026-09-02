// Shared contact-form handler. Runs on the server only — the Resend API key
// must never reach the browser, and Resend does not accept browser requests.

const REQUIRED = ["name", "email", "subject", "message"];
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const escapeHtml = (value) =>
  String(value).replace(
    /[&<>"']/g,
    (char) =>
      ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;",
      })[char]
  );

export function validate(payload = {}) {
  const fields = {};
  for (const key of ["name", "email", "phone", "subject", "message"]) {
    fields[key] = typeof payload[key] === "string" ? payload[key].trim() : "";
  }

  const missing = REQUIRED.filter((key) => !fields[key]);
  if (missing.length) {
    return { error: `Missing required field(s): ${missing.join(", ")}` };
  }
  if (!EMAIL_RE.test(fields.email)) {
    return { error: "That email address doesn't look right." };
  }
  if (fields.message.length > 5000) {
    return { error: "Message is too long." };
  }

  return { fields };
}

export async function sendContact(payload, env = process.env) {
  const { fields, error } = validate(payload);
  if (error) return { status: 400, body: { error } };

  const apiKey = env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("RESEND_API_KEY is not set");
    return { status: 500, body: { error: "Email is not configured." } };
  }

  const to = env.CONTACT_TO || "orjintaxavier@gmail.com";
  const from = env.CONTACT_FROM || "Portfolio Contact <onboarding@resend.dev>";
  const { name, email, phone, subject, message } = fields;

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to: [to],
      // Replying in the mail client goes straight back to the visitor.
      reply_to: email,
      subject: `Portfolio: ${subject}`,
      text: [
        message,
        "",
        "---",
        `From: ${name}`,
        `Email: ${email}`,
        phone ? `Phone: ${phone}` : null,
        `Sent: ${new Date().toUTCString()}`,
      ]
        .filter((line) => line !== null)
        .join("\n"),
      html: `
        <div style="font-family:system-ui,sans-serif;line-height:1.6;color:#0f172a">
          <h2 style="margin:0 0 4px">${escapeHtml(subject)}</h2>
          <p style="margin:0 0 16px;color:#64748b;font-size:14px">
            New message from your portfolio contact form
          </p>
          <div style="white-space:pre-wrap;padding:16px;border:1px solid #e2e8f0;border-radius:12px">${escapeHtml(
            message
          )}</div>
          <table style="margin-top:16px;font-size:14px;color:#475569">
            <tr><td style="padding-right:12px"><b>From</b></td><td>${escapeHtml(
              name
            )}</td></tr>
            <tr><td style="padding-right:12px"><b>Email</b></td><td>${escapeHtml(
              email
            )}</td></tr>
            ${
              phone
                ? `<tr><td style="padding-right:12px"><b>Phone</b></td><td>${escapeHtml(
                    phone
                  )}</td></tr>`
                : ""
            }
          </table>
        </div>`,
    }),
  });

  const result = await response.json().catch(() => ({}));

  if (!response.ok) {
    console.error("Resend error:", response.status, result);
    return {
      status: 502,
      body: { error: result?.message || "Email provider rejected the message." },
    };
  }

  return { status: 200, body: { ok: true, id: result.id } };
}
