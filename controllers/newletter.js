const User = require("../models/newletter");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const { StatusCodes } = require("http-status-codes");
const {
  BadRequestError,
  unAuthenticatedError,
} = require("../errors/errorsIndex");

const getallnemail = async (req, res) => {
  try {
    const users = await User.find({});

    res.status(StatusCodes.CREATED).json({ clients: users });
  } catch (error) {
    console.log(error);
  }
};
const getOnenemail = async (req, res) => {
  try {
    const user = await User.findOne({email:req.body.email});

    res.status(StatusCodes.CREATED).json({ user });
  } catch (error) {
    console.log(error);
  }
};
const deleteOnenemail = async (req, res) => {
  try {
    const user = await User.findOneAndDelete({email:req.body.email});

    res.status(StatusCodes.CREATED).json({ user });
  } catch (error) {
    console.log(error);
  }
};


const createNewsletterEmail = async (req, res) => {
  const user = await User.create({ ...req.body });
  const { name, email, digging_deep, livestreams, burning_q_and_a, weeky_blogs, special_events } = req.body;
  

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
    console.log("Done!");
  });

  var transporter2 = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.MAILER_EMAIL,
      pass: process.env.MAILER_PASS,
    },
  });
  const mailOptions2 = {
    from: process.env.MAILER_EMAIL,
    to: process.env.MAILER_EMAIL,
    subject: "New User",
    html: `
        <div style="text-align:left; min-height:100vh; padding:20px">
        
         <h2>name: ${name}, <br/></h2>
         <h2>name: ${email}, <br/></h2>
         
  
      
        </div>
        `,
  };
  transporter2.sendMail(mailOptions2, function (error, body) {
    if (error) {
      return res.json({ error: error });
    }
    res.status(StatusCodes.CREATED).json({ user: { name: user.name }, token });
  });
};

const generalUpdate = async (req, res, next) => {
 
  try {
    const user = await User.findOneAndUpdate(
      { email: req.body.email },
      req.body,
      {
        new: true,
        runValidators: true,
      },
    );
    if (!user) {
      return res.json({error :`No transaction with email found 404`})
    }

    res.status(StatusCodes.CREATED).json({ user });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getallnemail,
  deleteOnenemail,
  createNewsletterEmail,
  generalUpdate,
  getOnenemail,
  
};
