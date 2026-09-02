import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { sendContact } from "./server/send-contact.js";

// `vite dev` doesn't run the deployed serverless function, so mount the same
// handler as middleware to keep local behaviour identical to production.
function contactApi(env) {
  return {
    name: "contact-api",
    configureServer(server) {
      server.middlewares.use("/api/contact", async (req, res, next) => {
        if (req.method !== "POST") return next();

        let raw = "";
        for await (const chunk of req) raw += chunk;

        let result;
        try {
          result = await sendContact(JSON.parse(raw || "{}"), env);
        } catch (error) {
          console.error("contact api:", error);
          result = { status: 500, body: { error: "Unexpected server error." } };
        }

        res.statusCode = result.status;
        res.setHeader("Content-Type", "application/json");
        res.end(JSON.stringify(result.body));
      });
    },
  };
}

export default defineConfig(({ mode }) => {
  // "" prefix loads every var, including the server-only ones.
  const env = loadEnv(mode, process.cwd(), "");

  return { plugins: [react(), tailwindcss(), contactApi(env)] };
});
