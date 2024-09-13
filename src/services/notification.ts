import nodemailer from 'nodemailer';

console.log(process.env.MAIL_PASSWORD);
console.log(process.env.MAIL_SENDER);

export const gmailTransporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.MAIL_SENDER,
    pass: process.env.MAIL_PASSWORD,
  },
  tls: {
    rejectUnauthorized: false,
  },
});

// creating a zoho transporter
export default {
  gmailTransporter,
  // zohoTransporter,
};
