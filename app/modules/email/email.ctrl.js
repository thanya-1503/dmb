
'use strict';
const nodemailer = require("nodemailer");
const smtpTransport = require('nodemailer-smtp-transport');
exports.sentemail = async function (req, res) {
  const password = '123456'
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
    subject: 'Webasset',              
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

exports.sentemailOtp = async function (req, res) {
  // const otp = Math.floor(1000 + Math.random() * 9000)
  const username = req.body.username
  const otp = req.body.otp
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
    subject: 'Webasset',              
    html: `<b>รหัส OTP ของคุณคือ</b> ${otp}`
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






