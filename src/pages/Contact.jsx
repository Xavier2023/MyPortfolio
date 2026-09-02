import { useEffect, useState } from "react";
import showToast from "../utils/toast.js";
import { contactDetails } from "../data/profile.js";

const CONTACT_EMAIL = "orjintaxavier@gmail.com";

// If the mail provider is down, the visitor should still be able to reach him
// rather than losing what they typed.
const buildMailto = ({ name, subject, message, email, phone }) => {
  const body = [
    message,
    "",
    `From: ${name}`,
    `Email: ${email}`,
    phone ? `Phone: ${phone}` : null,
  ]
    .filter((line) => line !== null)
    .join("\n");

  return `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(
    subject
  )}&body=${encodeURIComponent(body)}`;
};

const EMPTY_FORM = {
  name: "",
  email: "",
  phone: "",
  subject: "",
  message: "",
};

export default function Contact() {
  const [form, setForm] = useState(EMPTY_FORM);
  const [isSending, setIsSending] = useState(false);
  const [status, setStatus] = useState(null);

  useEffect(() => {
    if (!status || status.mailto) return;
    const timer = setTimeout(() => setStatus(null), 5000);
    return () => clearTimeout(timer);
  }, [status]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const name = form.name.trim();
    const email = form.email.trim();
    const subject = form.subject.trim();
    const message = form.message.trim();

    if (!name || !email || !subject || !message) {
      showToast("Please fill in all required fields", "error");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      showToast("Please enter a valid email address", "error");
      return;
    }

    setIsSending(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, phone: form.phone.trim(), subject, message }),
      });

      const result = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(result.error || `Request failed (${response.status})`);

      showToast(
        "Message sent successfully! I'll get back to you soon.",
        "success"
      );
      setForm(EMPTY_FORM);
      setStatus({ text: "Message sent successfully!", color: "#4CAF50" });
    } catch (error) {
      console.error("Contact form send failed:", error);
      showToast(
        "Couldn't send that — you can email me directly instead.",
        "error"
      );
      setStatus({
        text: "Message not sent. Email me directly:",
        color: "#FF5252",
        mailto: buildMailto(form),
      });
    } finally {
      setIsSending(false);
    }
  };

  const field =
    "w-full rounded-xl border border-line bg-ink px-4 py-3.5 text-[15px] text-fg transition duration-300 focus:border-accent focus:shadow-[0_0_0_4px_var(--accent-tint)] focus:outline-none";

  return (
    <section className="mx-auto min-h-screen w-full max-w-7xl animate-rise px-[5%] pt-28 pb-16">
      <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)] lg:gap-14">
        <div>
          <h2 className="font-display text-3xl font-bold sm:text-4xl">
            Let's Work <span className="text-accent">Together</span>
          </h2>
          <p className="mt-4 mb-8 max-w-[52ch] text-muted">
            I'm always open to discussing new job opportunities, collaborations,
            or creative projects. Whether you have a question, an idea, or need a
            frontend engineer to bring your vision to life, feel free to reach
            out.
          </p>

          <div className="flex flex-col gap-3">
            {contactDetails.map(({ icon, label, value }) => (
              <div
                key={label}
                className="flex items-center gap-4 rounded-2xl border border-line bg-surface px-5 py-3.5 transition duration-300 hover:translate-x-1 hover:border-[color-mix(in_srgb,var(--accent)_40%,transparent)]"
              >
                <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-accent-tint text-xl text-accent">
                  <i className={`bx ${icon}`} />
                </span>
                <div>
                  <p className="text-[11px] font-medium tracking-[0.08em] text-muted uppercase">
                    {label}
                  </p>
                  <p className="font-medium">{value}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <form
          id="contact-form"
          onSubmit={handleSubmit}
          className="rounded-3xl border border-line bg-surface p-6 shadow-2xl sm:p-9"
        >
          <h2 className="mb-6 font-display text-2xl font-bold sm:text-3xl">
            Contact <span className="text-accent">Me</span>
          </h2>

          <div className="grid gap-4 sm:grid-cols-2">
            <input
              type="text"
              name="name"
              aria-label="Full name"
              placeholder="Full Name"
              value={form.name}
              onChange={handleChange}
              required
              className={field}
            />
            <input
              type="email"
              name="email"
              aria-label="Email address"
              placeholder="Email Address"
              value={form.email}
              onChange={handleChange}
              required
              className={field}
            />
            <input
              type="text"
              name="phone"
              aria-label="Phone number"
              placeholder="Phone Number"
              value={form.phone}
              onChange={handleChange}
              className={field}
            />
            <input
              type="text"
              name="subject"
              aria-label="Email subject"
              placeholder="Email Subject"
              value={form.subject}
              onChange={handleChange}
              required
              className={field}
            />
            <textarea
              name="message"
              aria-label="Your message"
              placeholder="Your Message Here"
              value={form.message}
              onChange={handleChange}
              required
              className={`${field} h-44 resize-y sm:col-span-2`}
            />
          </div>

          <button
            type="submit"
            disabled={isSending}
            className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-accent px-7 py-3.5 text-sm font-semibold text-on-accent shadow-[0_8px_24px_var(--accent-glow)] transition duration-300 enabled:hover:-translate-y-1 enabled:hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {isSending ? (
              <>
                <i className="bx bx-loader-alt animate-spin text-lg" /> Sending...
              </>
            ) : (
              <>
                <i className="bx bx-send text-lg" /> Send Message
              </>
            )}
          </button>

          <p
            className="mt-3 min-h-5 text-center text-sm"
            style={{ color: status?.color }}
          >
            {status?.text}
            {status?.mailto && (
              <a
                href={status.mailto}
                className="ml-1 font-medium text-accent underline underline-offset-2"
              >
                {CONTACT_EMAIL}
              </a>
            )}
          </p>
        </form>
      </div>
    </section>
  );
}
