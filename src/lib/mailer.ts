import 'server-only';
import nodemailer from 'nodemailer';

const host = process.env.EMAIL_SERVER_HOST;

interface Mail {
  to: string;
  subject: string;
  html: string;
  text: string;
}

/**
 * Sends transactional email over SMTP.
 * When EMAIL_SERVER_HOST is not configured (local dev), logs the message to the
 * server console instead so flows like password reset remain testable.
 */
export async function sendMail(mail: Mail): Promise<void> {
  if (!host) {
    console.log('\n📧 [DEV EMAIL — SMTP not configured]');
    console.log(`To:      ${mail.to}`);
    console.log(`Subject: ${mail.subject}`);
    console.log(`${mail.text}\n`);
    return;
  }

  const port = Number(process.env.EMAIL_SERVER_PORT ?? 587);
  const transport = nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: process.env.EMAIL_SERVER_USER
      ? {
          user: process.env.EMAIL_SERVER_USER,
          pass: process.env.EMAIL_SERVER_PASSWORD,
        }
      : undefined,
  });

  await transport.sendMail({
    from: process.env.EMAIL_FROM ?? 'Bossert Immobilien <no-reply@bossert-immobilien.de>',
    ...mail,
  });
}
