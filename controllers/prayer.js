const Prayer = require("../models/prayers");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const { StatusCodes } = require("http-status-codes");
const {
  BadRequestError,
  unAuthenticatedError,
} = require("../errors/errorsIndex");

const getallPrayers = async (req, res) => {
  try {
    const prayers = await Prayer.find({});

    res.status(StatusCodes.CREATED).json({ prayers });
  } catch (error) {
    console.log(error);
  }
};

const createNewPrayer = async (req, res) => {
  const newPrayer = await Prayer.create({ ...req.body });
  const { name, email, prayer } = req.body;

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
        <p>Your Prayer was recieved.You will update on the status in time.</p> <br/> <br/>
        
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
        <p> New Prayer Request From ${name}</p>
        <br/>
        <p>Please read and respond to the message as soon as possible</p>
          <br/>
          <br/>
          <h4>Sender's Name : <span>${name}</span></h4> 
          <h4>Sender's Email : <span>${email}</span></h4>
          <p> The Prayer Request: <span>${prayer}</span> </p>
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
      res.status(StatusCodes.CREATED).json({ newPrayer });
      console.log("Done!");
    });
  });
};

module.exports = {
  getallPrayers,

  createNewPrayer,
};
