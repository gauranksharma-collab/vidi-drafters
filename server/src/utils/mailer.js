const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
});

function adminNotificationHtml({ heading, rows }) {
  const rowsHtml = rows
    .map(([label, value]) => `<tr><td><strong>${label}:</strong></td><td>${value || ''}</td></tr>`)
    .join('');
  return `
  <html><body>
  <table border="0" cellpadding="8" cellspacing="0" width="100%" style="max-width:600px;border:1px solid #ddd;font-family:Arial, sans-serif;">
    <tr><td colspan="2" style="background:#0f8513;color:#fff;text-align:center;padding:10px;font-size:18px;">${heading}</td></tr>
    ${rowsHtml}
  </table>
  </body></html>`;
}

function userAutoReplyHtml({ name, rows }) {
  const itemsHtml = rows.map(([label, value]) => `<li>${label}: ${value || ''}</li>`).join('');
  return `
  <html><body style="font-family:Arial,sans-serif;">
    <p>Dear <strong>${name}</strong>,</p>
    <p>Thank you for reaching out to us. We have received your message and our team will get back to you shortly.</p>
    <p><strong>Your Submitted Details:</strong></p>
    <ul>${itemsHtml}</ul>
    <br>
    <p>Warm regards,<br>VIDHIK DRAFTER Team</p>
  </body></html>`;
}

async function sendMail({ to, replyTo, subject, html }) {
  return transporter.sendMail({
    from: `"VIDHIK DRAFTER" <${process.env.SMTP_USER}>`,
    to,
    replyTo,
    subject,
    html,
  });
}

module.exports = { sendMail, adminNotificationHtml, userAutoReplyHtml };
