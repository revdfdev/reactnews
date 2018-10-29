const mailer = require('nodemailer');
require('dotenv').config({path: '.variables.env'});
const emailPort = process.env.EMAIL_PORT;
const emailAddress = process.env.EMAIL;
const host = process.env.EMAIL_HOST;
const emailPassword = process.env.EMAIL_PASSWORD;
const from = process.env.EMAIL_FROM;

console.log(emailAddress);

const smtpTransport = mailer.createTransport({
    host: host,
    port: emailPort,
    secure: true,
    auth: {
        user: emailAddress,
        pass: emailPassword,
    },
    tls: {
        // do not fail on invalid certs
        rejectUnauthorized: false
    }
});


module.exports = function sendmail(emailTo, link) {
    console.log(emailAddress);
    const mail = {
        from: from,
        to: emailTo,
        subject: 'Merkmod news email verification',
        text: `Please verify your email visit this link ${link}`,
        //html: `<a href=\"${link}"\>Verify</a>`
    }
    return new Promise((resolve, reject) => {
        smtpTransport.sendMail(mail, function(error, response) {
            if (error) {
                reject(error);
            }
            resolve(response);
        });
    });    
}