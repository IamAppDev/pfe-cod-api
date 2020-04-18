const nodemailer = require('nodemailer');
const config = require('config');

const getTransporter = () => {
	return nodemailer.createTransport({
		host: 'smtp.gmail.com',
		port: 587,
		secure: false, // true for 465, false for other ports
		auth: {
			user: config.get('smtpUser'), // generated ethereal user
			pass: config.get('smtpPassword') // generated ethereal password
		}
	});
};

// async..await is not allowed in global scope, must use a wrapper
const sendEmailRegistration = async (receiverEmail, url) => {
	// create reusable transporter object using the default SMTP transport
	let transporter = getTransporter();

	// send mail with defined transport object
	let info = await transporter.sendMail({
		from: `💻 AUTO-COD <${config.get('smtpUser')}>`, // sender address
		to: receiverEmail, // list of receivers
		subject: '✅ REQUIRED', // Subject line
		//text: "Hello world?", // plain text body
		html: ` <h1>Welcome to AUTO-COD </h1>
            <h3>Click <a href="${url}">HERE</a> to confirm your email !</h3>` // html body
	});
};

const sendInvitation = async (receiverFirstName, receiverEmail, receiverPassword, senderFirstName, senderLastName) => {
	let transporter = getTransporter();
	let info = await transporter.sendMail({
		from: `💻 AUTO-COD <${config.get('smtpUser')}>`,
		to: receiverEmail,
		subject: '🔥 Invitation to AUTO-COD',
		html: ` <h1>Hi ${receiverFirstName} !</h1>
            <h3>Mr ${senderFirstName} ${senderLastName} invited you to join the team !</h3>
            <h3>Here is your credentials : 
              <ul>
                <li>Login : ${receiverEmail}</li>
                <li>Password : ${receiverPassword}</li>
              </ul>
            </h3>
            <h3><strong>P.S: For security reasons, once you logged, change your password !</strong></h3>`
	});
};

const sendPasswordReset = async (receiverFirstName, receiverEmail, newPassword) => {
  let transporter = getTransporter();
	let info = await transporter.sendMail({
		from: `💻 AUTO-COD <${config.get('smtpUser')}>`,
		to: receiverEmail,
		subject: '🔑 Password Reset',
		html: ` <h1>Hi ${receiverFirstName} !</h1>
            <h3>Your new password is : ${newPassword} !</h3>
            <h3><strong>P.S: For security reasons, once you logged, change your password !</strong></h3>`
	});
}

module.exports.sendEmailRegistration = sendEmailRegistration;
module.exports.sendInvitation = sendInvitation;
module.exports.sendPasswordReset = sendPasswordReset;
