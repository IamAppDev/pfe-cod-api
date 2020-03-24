const nodemailer = require('nodemailer');
const config = require('config');

// async..await is not allowed in global scope, must use a wrapper
const sendEmail = async (receiver, url) => {
 
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
    from: '"AUTO-COD 👻" <banadora20182018@gmail.com>', // sender address
    to: receiver, // list of receivers
    subject: "✔ REQUIRED", // Subject line
    //text: "Hello world?", // plain text body
    html: ` <h1>Welcome to AUTO-COD </h1>
            <h3>Click <a href="${url}">HERE</a> to confirm your email !</h3>` // html body
  });

}

module.exports = sendEmail;
