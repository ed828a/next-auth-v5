import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    type: "OAuth2",
    user: process.env.GOOGLE_USER_EMAIL,
    clientId: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    refreshToken: process.env.GOOGLE_REFRESH_TOKEN,
    accessToken: process.env.GOOGLE_ACCESS_TOKEN,
    expires: new Date().getTime(), // this will request a new token each time so that it never expires. google allows up to 10,000 requests per day for free.
  },
});

export const sendVerificationEmail = async (email: string, token: string) => {
  const confirmLink = `http://localhost:3000/auth/new-verification?token=${token}`;

  // send email
  const mailOptions = {
    from: process.env.GOOGLE_USER_EMAIL,
    to: email,
    subject: "Confirm your email",
    html: `<p>Click <a href="${confirmLink}">here</a> to confirm email.</p>`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error); // if anything goes wrong an error will show up in your terminal.
    } else {
      console.log(`Message sent: ${info.messageId}`); // if it's a success, a confirmation will show up in your terminal.
    }
  });
};

export const sendPasswordResetEmail = async (email: string, token: string) => {
  const resetLink = `http://localhost:3000/auth/new-password?token=${token}`;

  // send email
  const mailOptions = {
    from: process.env.GOOGLE_USER_EMAIL,
    to: email,
    subject: "Reset your password",
    html: `<p>Click <a href="${resetLink}">here</a> to reset your password.</p>`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error); // if anything goes wrong an error will show up in your terminal.
    } else {
      console.log(`Message sent: ${info.messageId}`); // if it's a success, a confirmation will show up in your terminal.
    }
  });
};

export const sendTwoFactorTokenEmail = async (email: string, token: string) => {
  const mailOptions = {
    from: process.env.GOOGLE_USER_EMAIL,
    to: email,
    subject: "2FA Code",
    html: `<p>Your 2FA code: ${token}.</p>`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error); // if anything goes wrong an error will show up in your terminal.
    } else {
      console.log(`Message sent: ${info.messageId}`); // if it's a success, a confirmation will show up in your terminal.
    }
  });
};
