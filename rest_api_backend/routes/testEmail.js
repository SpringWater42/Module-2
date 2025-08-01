require('dotenv').config();
const nodemailer = require('nodemailer');

async function sendTestEmail() {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_PASS,
    }
  });

  const mailOptions = {
    from: process.env.GMAIL_USER,
    to: 'your_test_email@example.com',
    subject: 'Test email',
    text: 'Hello from testEmail.js',
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent:', info.messageId);
  } catch (error) {
    console.error('Error:', error);
  }
}

sendTestEmail();
