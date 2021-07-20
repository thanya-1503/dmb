
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
    subject: 'รหัสผ่านเข้าสู่ระบบ Webasset ของคุณ',             
    html: 
     `<p><b >Webasset</b></p>
      <p style="margin-left: 20px;" >คุณได้ลงทะเบียน ${username} เป็น User Webasset รหัสผ่านของคุณคือ ${password}</p><br>
      <tr>
        <td class="text-footer1 pb10">
          <img width="70" height="50" src="https://entronica.co.th/assets/img/logo.png">
          <span style="color:#800000; font-family:'Muli', Arial,sans-serif; font-size:14px; line-height:20px; text-align:center; padding-bottom:10px;font-weight: 700;">Entronica Co,ltd.</span>
        </td>
      </tr>
      <tr>
        <td class="text-footer2"
          style="color:#8297b3; font-family:'Muli', Arial,sans-serif; font-size:12px; line-height:20px; text-align:center;padding-top: 1px">
          408/68 Phaholyothin Place, Floor.16, Phahonyothin Rd, <br/>Khwaeng
          Samsen Nai, Khet Phaya Thai, ฺBangkok 10400
        </td>
        </tr>`
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
    subject: 'Forgot Password',              
    html: 
    `<p><b >Webasset</b></p>
      <p style="margin-left: 20px; font-size:14px;">OTP สำหรับการตั้งค่ารหัสผ่านใหม่ของคุณคือ <b>${otp}</b></p>
      <tr>
        <td class="text-footer1 pb10">
          <img width="70" height="50" src="https://entronica.co.th/assets/img/logo.png">
          <span style="color:#800000; font-family:'Muli', Arial,sans-serif; font-size:14px; line-height:20px; text-align:center; padding-bottom:10px;font-weight: 700;">Entronica Co,ltd.</span>
      </td>
      </tr>
      <tr>
        <td class="text-footer2"
          style="color:#8297b3; font-family:'Muli', Arial,sans-serif; font-size:12px; line-height:20px; text-align:center;padding-top: 1px;">
          408/68 Phaholyothin Place, Floor.16, Phahonyothin Rd, <br />Khwaeng
          Samsen Nai, Khet Phaya Thai, ฺBangkok 10400
        </td>
      </tr> `
  };
  transporter.sendMail(mailOptions, function (err, info) {
    if(err){
      console.log(err)
      res.end("error")
    } 
    else
      console.log(info);
 });
};



