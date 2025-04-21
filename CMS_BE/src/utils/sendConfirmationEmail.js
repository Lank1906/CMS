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
    const info = await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: toEmail,
      subject: 'Confirm account registration',
      html: `
        <h3>Welcome!</h3>
        <p>Please click on the link below to confirm your account:</p>
        <a href="${link}">Verify account</a>
      `
    });

    console.log("Email has been sent:", info.messageId);
  } catch (err) {
    console.error("Email sending failed:", err);
    throw err;
  }
};

export default sendConfirmationEmail;
