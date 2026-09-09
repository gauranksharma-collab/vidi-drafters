const ContactMessage = require('../models/ContactMessage');
const { sendMail, adminNotificationHtml, userAutoReplyHtml } = require('../utils/mailer');

async function createContactMessage(req, res) {
  const { name, email, mobile, subject, message } = req.body;

  if (!name || !email || !mobile || !message) {
    return res.status(400).json({ error: 'Name, email, mobile and message are required.' });
  }

  const contact = await ContactMessage.create({ name, email, mobile, subject, message });

  const rows = [
    ['Name', name],
    ['Email', email],
    ['Mobile', mobile],
    ['Subject', subject],
    ['Message', message],
    ['Date', contact.createdAt.toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })],
  ];

  try {
    await sendMail({
      to: process.env.ADMIN_NOTIFICATION_EMAIL,
      replyTo: email,
      subject: `New Contact Us - ${name}`,
      html: adminNotificationHtml({ heading: 'New Contact Us Submission', rows }),
    });
    await sendMail({
      to: email,
      subject: 'Thank you for contacting VIDHIK DRAFTER',
      html: userAutoReplyHtml({ name, rows: rows.slice(0, 4) }),
    });
  } catch (err) {
    console.error('Contact email failed:', err.message);
  }

  res.status(201).json({ message: 'Message sent successfully.' });
}

module.exports = { createContactMessage };
