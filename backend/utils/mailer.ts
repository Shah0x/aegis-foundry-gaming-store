import nodemailer from 'nodemailer';

const SMTP_HOST = process.env.SMTP_HOST || 'smtp.ethereal.email';
const SMTP_PORT = parseInt(process.env.SMTP_PORT || '587');
const SMTP_USER = process.env.SMTP_USER;
const SMTP_PASS = process.env.SMTP_PASS;

let transporter: nodemailer.Transporter | null = null;

export const getMailTransporter = (): nodemailer.Transporter | null => {
  if (!transporter) {
    if (SMTP_USER && SMTP_PASS) {
      transporter = nodemailer.createTransport({
        host: SMTP_HOST,
        port: SMTP_PORT,
        secure: SMTP_PORT === 465,
        auth: {
          user: SMTP_USER,
          pass: SMTP_PASS,
        },
      });
      console.log('📬 Mail transporter configured successfully with Custom SMTP');
    } else {
      // Create a test account on Ethereal as fallback so we don't crash
      nodemailer.createTestAccount().then((account) => {
        transporter = nodemailer.createTransport({
          host: 'smtp.ethereal.email',
          port: 587,
          secure: false,
          auth: {
            user: account.user,
            pass: account.pass,
          },
        });
        console.log(`📬 Mail fallback configured using Ethereal. Preview URL: https://ethereal.email`);
      }).catch(err => {
        console.warn('⚠️ Could not configure Ethereal fallback transporter for emails. Mail will be mocked.', err);
      });
    }
  }
  return transporter;
};

interface SendEmailArgs {
  to: string;
  subject: string;
  text: string;
  html?: string;
}

export const sendEmailNotification = async ({ to, subject, text, html }: SendEmailArgs) => {
  const mailTransporter = getMailTransporter();
  const mailSubject = `[ELITE TECH GEAR] ${subject}`;

  if (!mailTransporter) {
    console.log(`📧 [MOCK EMAIL] To: ${to} | Subject: ${mailSubject} | Content: ${text}`);
    return;
  }

  try {
    const info = await mailTransporter.sendMail({
      from: `"ELITE TECH GEAR" <${SMTP_USER || 'no-reply@elitetechgear.com'}>`,
      to,
      subject: mailSubject,
      text,
      html: html || text.replace(/\n/g, '<br>'),
    });
    console.log(`📧 Email sent successfully! MessageID: ${info.messageId}`);
  } catch (error) {
    console.error('❌ Error sending email notification:', error);
  }
};
