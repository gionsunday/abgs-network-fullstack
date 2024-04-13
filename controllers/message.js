const Message = require("../models/message");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const { StatusCodes } = require("http-status-codes");
const {
  BadRequestError,
  unAuthenticatedError,
} = require("../errors/errorsIndex");

const getallMessages = async (req, res) => {
  try {
    const messages = await Message.find({});

    res.status(StatusCodes.CREATED).json({ messages });
  } catch (error) {
    console.log(error);
  }
};

const createNewMessage = async (req, res) => {
  const newMessage = await Message.create({ ...req.body });
  const { name, email, phone, subject, message } = req.body;

  var transporter1 = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.MAILER_EMAIL,
      pass: process.env.MAILER_PASS,
    },
  });
  const mailOptions1 = {
    from: process.env.MAILER_EMAIL,
    to: email,
    subject: "Thank You",
    attachments: [
      {
        filename: "newimg.jpg",
        path: __dirname + "/logo.gif",
        cid: "save-logo.gif",
      },
    ],
    html: `
        <body style="background-color:#fff; padding:5px; height:100%; width:100%>
        <div style="text-align:left; min-height:100vh; padding:20px">
        <img style="width:120px; height:80px" src="cid:save-logo.gif" />
        
        <img src="https:/" alt="logo" width="60" height="60"/>
         <h2>Hi, ${name}. <br/> Thank you for reaching out to us.</h2>
        <p>Your message was recieved and it's being reviewed. You will get a reply from us shortly.</p> <br/> <br/>
        
        <p>  For assistance  <a href="mailto:abundancespringgospelnetwork@gmail.com">PLEASE SEND US A MAIL</a></p>
        <br/>
        <br/>
        Best regards, <br/>
        A.B.S.G Network Team.
        </div>
        </body>
        `,
  };
  const mailOptions2 = {
    from: process.env.MAILER_EMAIL,
    to: process.env.MAILER_EMAIL,
    subject: "New Message",
    attachments: [
      {
        filename: "newimg.jpg",
        path: __dirname + "/logo.gif",
        cid: "save-logo.gif",
      },
    ],
    html: `
        <div style="text-align:left; min-height:100vh; padding:20px">
        <img style="width:120px; height:80px" src="cid:save-logo.gif" />
        <p> You have a message from ${name}</p>
        <br/>
        <p>Please read and respond to the message as soon as possible</p>
          <br/>
          <br/>
          <h4>Sender's Name : <span>${name}</span></h4> 
          <h4>Sender's Email : <span>${email}</span></h4>
          <h4>Sender's Phone : <span>${phone}</span></h4>
          <br/>
          <p> Message Subject: <span>${subject}</span> </p>
          <br/>
          <p> Message Content: <span>${message}</span> </p>
        </div>
        `,
  };

  transporter1.sendMail(mailOptions1, function (error, body) {
    if (error) {
      return res.json({ error: error });
    }
    transporter1.sendMail(mailOptions2, function (error, body) {
      if (error) {
        console.log(error);
      }
      res.status(StatusCodes.CREATED).json({ newMessage });
      console.log("Done!");
    });
  });
};

module.exports = {
  getallMessages,

  createNewMessage,
};
