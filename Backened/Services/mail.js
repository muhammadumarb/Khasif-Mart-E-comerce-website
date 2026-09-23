const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});
console.log("MAIL_USER:", process.env.MAIL_USER);
console.log("MAIL_PASS set:", !!process.env.MAIL_PASS, process.env.MAIL_PASS?.length);

module.exports = transporter;