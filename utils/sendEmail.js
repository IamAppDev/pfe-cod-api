const nodemailer = require('nodemailer');
const config = require('config');

// async..await is not allowed in global scope, must use a wrapper
const sendEmail = async (receiver) => {
 
  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: config.get('smtpUser'), // generated ethereal user
      pass: config.get('smtpPassword') // generated ethereal password
    }
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: '"Fred Foo 👻" <banadora20182018@gmail.com>', // sender address
    to: receiver, // list of receivers
    subject: "Hello ✔", // Subject line
    text: "Hello world?", // plain text body
    html: "<b>Hello world?</b>" // html body
  });

}

module.exports = sendEmail;
