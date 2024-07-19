const nodemailer = require("nodemailer")
require("dotenv").config();


exports.mailSender = async (email, title, token) => {

    console.log(email);

  try {
    let transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
      secure: false,
    })

    let info = await transporter.sendMail({
      from: `"BooksMart" <${process.env.MAIL_USER}>`, // sender address
      to: `${email}`, // list of receivers
      subject: `${title}`, // Subject line
      html: `Please verify your email by clicking on the following link: http://localhost:4000/api/v1/auth/verify-email?token=${token}`, // html body
    })

    console.log(info.response);

    return info

  } catch (error) {
    console.log(error)
    return error
  }
}

