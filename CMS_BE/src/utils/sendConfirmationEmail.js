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
        <div style="background-color: #f4f4f7; padding: 40px 0; font-family: Arial, sans-serif;">
              <div style="max-width: 600px; margin: auto; background-color: #ffffff; padding: 30px; border-radius: 8px; box-shadow: 0 4px 12px rgba(0,0,0,0.05); color: #333; line-height: 1.6;">
                <div style="text-align: center; margin-bottom: 30px;">
                  <div style="font-size: 24px; color: #2D3052; font-weight: bold;">BlueOC</div>
                  <h2 style="color: #2D3052; margin: 0;">Verify Your Email</h2>
                </div>
                <p>Hi, Welcome to BlueOC!</p>   
                <p>Thank you for joining us! We're excited to have you on board. Click the button below to proceed:</p>
                <div style="text-align: center; margin: 30px 0;">
                  <a href="${link}"
                    style="display: inline-block; padding: 14px 28px; background-color: #2D3052; color: #fff; text-decoration: none; border-radius: 5px; font-weight: bold;">
                    Verify Your Email
                  </a>
                </div>
                <p><strong>This link will expire in 1 hour.</strong></p>
                <p>Thanks,<br/>The CMS Support Team</p>
                <hr style="margin: 40px 0; border: none; border-top: 1px solid #ddd;">
                <div style="font-size: 12px; color: #999; text-align: center;">
                  <p>&copy; ${new Date().getFullYear()} CMS System. All rights reserved.</p>
                  <p>12th Floor, Technopark Tower, Vinhomes Ocean Park, Gia Lam, Hanoi</p>
                  <p>Need help? <a href="https://blueoc.tech/en/contact" style="color: #2D3052;">Contact Support</a></p>
                </div>
              </div>
            </div>
      `,
    });
  } catch (err) {
    throw err;
  }
};

export default sendConfirmationEmail;
