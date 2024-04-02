import nodemailer from "nodemailer";

export const emailInit = (to: string, token: string) => {
  const EMAIL_PORT = process.env.EMAIL_PORT
    ? Number(process.env.EMAIL_PORT)
    : undefined;

  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: EMAIL_PORT,
    secure: false,
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  const options = {
    to,
    from: process.env.EMAIL_FROM,
    subject: "Reset your password",
    html: `<h1>blogsHub</h1><h4>This is an email sent form blogsHub to reset your password.</h4> <p>your reset token is : <b>${token} </b> <br> it expires in 30mins</p>`,
  };

  return { transporter, options };
};
