
'use strict';
const nodemailer = require("nodemailer");
const smtpTransport = require('nodemailer-smtp-transport');

exports.sentemail = async function (req, res) {
  const test = Math.floor(100000 + Math.random() * 900000)
  const email = req.body.email
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
    to: `${email}`,            
    subject: 'Hello from sender',              
    html: `<b>รหัสผ่านของคุณคือ</b> ${test}`
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



