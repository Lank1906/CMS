import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  tls: {
    rejectUnauthorized: false,
  },
});

const sendConfirmationEmail = async (toEmail, token) => {
  const backendUrl = process.env.BACKEND_URL;

  if (!backendUrl) {
    throw new Error('Backend URL is not set in environment variables');
  }

  const link = `${backendUrl}/api/confirm?token=${token}`;

  try {
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: toEmail,
      subject: 'Confirm account registration',
      html: `
        <h3>Welcome to BluOC!</h3>
        <p>Thank you for joining us! We're excited to have you on board. To get started, please confirm your account by clicking the link below:</p>
        <a href="${link}">Verify account</a>
        <p>Please note: This verification link will expire in 1 hour.</p>
      `,
    });
  } catch (err) {
    throw err;
  }
};

export default sendConfirmationEmail;
