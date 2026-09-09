const Registration = require('../models/Registration');
const { sendMail, adminNotificationHtml, userAutoReplyHtml } = require('../utils/mailer');

async function createRegistration(req, res) {
  const { name, mobile, email, service } = req.body;

  if (!name || !mobile) {
    return res.status(400).json({ error: 'Name and mobile number are required.' });
  }

  const registration = await Registration.create({ name, mobile, email, service });

  const rows = [
    ['Name', name],
    ['Email', email],
    ['Mobile', mobile],
    ['Service', service],
    ['Date', registration.createdAt.toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })],
  ];

  try {
    await sendMail({
      to: process.env.ADMIN_NOTIFICATION_EMAIL,
      replyTo: email,
      subject: `New Registration - ${name}`,
      html: adminNotificationHtml({ heading: 'New Registration Form Submission', rows }),
    });
    if (email) {
      await sendMail({
        to: email,
        subject: 'Thank you for contacting VIDHIK DRAFTER',
        html: userAutoReplyHtml({ name, rows: rows.slice(0, 4) }),
      });
    }
  } catch (err) {
    console.error('Registration email failed:', err.message);
  }

  res.status(201).json({ message: 'Registration received successfully.' });
}

module.exports = { createRegistration };
