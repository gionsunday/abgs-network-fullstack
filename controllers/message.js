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
    subject: "Welcome On Board",
    html: `
        <body style="background-color:#fff; padding:5px; height:100%; width:100%>
        <div style="text-align:left; min-height:100vh; padding:20px">
        <img src="https:/" alt="logo" width="60" height="60"/>
         <h2>Hi, ${name}. <br/> Thank you for subscribing to our news letter. </h2>
        <p>Kindly note that you will be recieving occational contents from us based on your chosen options.</p> <br/> <br/>
        <h4 style="color:aqua">Your Options </h4>
        <ol>
        <li>${digging_deep}</li>
        <li>${burning_q_and_a}</li>
        <li>${weeky_blogs}</li>
        <li>${livestreams}</li>
        <li>${special_events}</li>
        </ol>
        <p>  For assistance  <a href="mailto:abundancespringgospelnetwork@gmail.com">PLEASE SEND US A MAIL</a></p>
        <br/>
        <br/>
        Best regards,
        A.B.S.G Network Team.
        </div>
        </body>
        `,
  };
  transporter1.sendMail(mailOptions1, function (error, body) {
    if (error) {
      return res.json({ error: error });
    }

    res.status(StatusCodes.CREATED).json({ newMessage });
    console.log("Done!");
  });
};

module.exports = {
  getallMessages,

  createNewMessage,
};
