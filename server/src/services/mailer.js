import nodemailer from "nodemailer";

export function createTransportFromEnv() {
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT) || 587,
    secure: String(process.env.SMTP_SECURE) === "true",
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS
    }
  });
}

export async function sendSummaryEmail({ transporter, from, to, subject, html }) {
  return transporter.sendMail({
    from,
    to, // comma-separated string
    subject,
    html
  });
}
