require("dotenv").config();
const path = require("path");
const ejs = require("ejs");
const { Resend } = require("resend");

const RESEND_API_KEY = process.env.RESEND_API_KEY;

exports.handler = async (event) => {
  try {
    const resendClient = new Resend(RESEND_API_KEY);
    console.log(event, typeof event);
    const { receiverEmail, senderEmail, senderName } = event;
    const filePath = path.join(__dirname, "templates/newEvent.ejs");
    const html = await ejs.renderFile(filePath, {
      name: senderName,
      email: senderEmail,
    });

    const res = await resendClient.emails.send({
      from: "Cally <noreply@password-manager.anuj-thakur.com>",
      to: receiverEmail,
      subject: "New Event Request",
      html: html,
    });
    console.log(res);
  } catch (error) {
    console.log(error);
  }
};
