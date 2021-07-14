
'use strict';
const nodemailer = require("nodemailer");
const smtpTransport = require('nodemailer-smtp-transport');

exports.sentemail = async function (req, res) {
  const password = 123456
  const username = req.body.username
  const transporter = nodemailer.createTransport(smtpTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, 
    auth: {
          user: "conun1543@gmail.com",
          pass: "0853811894", 
    },
    tls: {
        rejectUnauthorized: false
        }
  }));
  let mailOptions = {
    from: 'conun1543@gmail.com',         
    to: `${username}`,            
    subject: 'Hello from sender',              
    html: `<b>รหัสผ่านของคุณคือ</b> ${password}`
  };
  transporter.sendMail(mailOptions, function (err, info) {
    if(err){
      console.log(err)
      res.end("error")
    } 
    else
      console.log(info);
 });
}






