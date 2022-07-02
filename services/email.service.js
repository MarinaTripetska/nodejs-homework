const nodemailer = require("nodemailer");
const { PASSOWORD_MAIL_FROM, EMAIL_FROM, PORT } = require("../helpers/env");

const BASE_URL = `localhost:${PORT}`;

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: EMAIL_FROM,
    pass: PASSOWORD_MAIL_FROM,
  },
});

const sendEmail = async (userEmail, verifyToken) => {
  const link = `${BASE_URL}/users/verify/${verifyToken}`;

  try {
    const options = {
      from: EMAIL_FROM,
      to: userEmail,
      subject: "Sending email with NodeMailer",

      html: `<b>Confirm your email by clicking on link: </b> <a target="_blank">${link}</a>`,
    };

    const info = await transporter.sendMail(options);

    console.log("Message sent: %s", info.messageId);
  } catch (error) {
    console.log("ERROR", error);
  }
};

module.exports = { sendEmail };
