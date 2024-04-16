const Newsletter = require("../models/newletter");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const { StatusCodes } = require("http-status-codes");
const {
  BadRequestError,
  unAuthenticatedError,
} = require("../errors/errorsIndex");

const getallNews = async (req, res) => {
  try {
    const newsletter = await Newsletter.find({});

    res.status(StatusCodes.CREATED).json({ newsletter });
  } catch (error) {
    console.log(error);
  }
};

const createNewsletter = async (req, res) => {
  const newsletter = await Newsletter.create({ ...req.body });
  const {
    name,
    email,
    digging_deep,
    livestreams,
    burning_q_and_a,
    weeky_blogs,
    special_events,
  } = req.body;

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
        <img src="cid:save-logo.gif" alt="logo" width="60" height="60"/>
         <h2>Hi, ${name}. <br/> Thank you for subscribing to our news letter. </h2>
        <p>Kindly note that you will be recieving occational contents from us based on your chosen options.</p>
        <h4 style="color:aqua">Your Options: </h4>
        <p>${digging_deep}</p>
        <p>${burning_q_and_a}</p>
        <p>${weeky_blogs}</p>
        <p>${livestreams}</p>
        <p>${special_events}</p>
        
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
        <p> New Newsletter Subscribtion</p>
        <br/>
          
          <h4> Subscriber's Name : <span>${name}</span></h4> 
          <h4>Subscriber's Email : <span>${email}</span></h4>
          <h4>Subscribtion Options: <span></span></h4>
          <p>${digging_deep}</p>
          <p>${burning_q_and_a}</p>
          <p>${livestreams}</p>
          <p>${weeky_blogs}</p>
          <p>${special_events}</p>
          <br/>
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
      res.status(StatusCodes.CREATED).json({ newsletter });
      console.log("Done!");
    });
  });
};

module.exports = {
  getallNews,

  createNewsletter,
};

// const User = require("../models/newletter");
// const jwt = require("jsonwebtoken");
// const nodemailer = require("nodemailer");
// const { StatusCodes } = require("http-status-codes");
// const {
//   BadRequestError,
//   unAuthenticatedError,
// } = require("../errors/errorsIndex");

// const getallnemail = async (req, res) => {
//   try {
//     const users = await User.find({});

//     res.status(StatusCodes.CREATED).json({ clients: users });
//   } catch (error) {
//     console.log(error);
//   }
// };
// const getOnenemail = async (req, res) => {
//   try {
//     const user = await User.findOne({ email: req.body.email });

//     res.status(StatusCodes.CREATED).json({ user });
//   } catch (error) {
//     console.log(error);
//   }
// };
// const deleteOnenemail = async (req, res) => {
//   try {
//     const user = await User.findOneAndDelete({ email: req.body.email });

//     res.status(StatusCodes.CREATED).json({ user });
//   } catch (error) {
//     console.log(error);
//   }
// };

// const createNewsletterEmail = async (req, res) => {
//   const user = await User.create({ ...req.body });
//   const {
//     name,
//     email,
//     digging_deep,
//     livestreams,
//     burning_q_and_a,
//     weeky_blogs,
//     special_events,
//   } = req.body;

//   var transporter1 = nodemailer.createTransport({
//     service: "gmail",
//     auth: {
//       user: process.env.MAILER_EMAIL,
//       pass: process.env.MAILER_PASS,
//     },
//   });
//   const mailOptions1 = {
//     from: process.env.MAILER_EMAIL,
//     to: email,
//     subject: "Welcome On Board",
//     html: `
//         <body style="background-color:#fff; padding:5px; height:100%; width:100%>
//         <div style="text-align:left; min-height:100vh; padding:20px">
//         <img src="https:/" alt="logo" width="60" height="60"/>
//          <h2>Hi, ${name}. <br/> Thank you for subscribing to our news letter. </h2>
//         <p>Kindly note that you will be recieving occational contents from us based on your chosen options.</p> <br/> <br/>
//         <h4 style="color:aqua">Your Options </h4>
//         <ol>
//         <li>${digging_deep}</li>
//         <li>${burning_q_and_a}</li>
//         <li>${weeky_blogs}</li>
//         <li>${livestreams}</li>
//         <li>${special_events}</li>
//         </ol>
//         <p>  For assistance  <a href="mailto:abundancespringgospelnetwork@gmail.com">PLEASE SEND US A MAIL</a></p>
//         <br/>
//         <br/>
//         Best regards,
//         A.B.S.G Network Team.
//         </div>
//         </body>
//         `,
//   };
//   transporter1.sendMail(mailOptions1, function (error, body) {
//     if (error) {
//       return res.json({ error: error });
//     }
//     console.log("Done!");
//   });

//   var transporter2 = nodemailer.createTransport({
//     service: "gmail",
//     auth: {
//       user: process.env.MAILER_EMAIL,
//       pass: process.env.MAILER_PASS,
//     },
//   });
//   const mailOptions2 = {
//     from: process.env.MAILER_EMAIL,
//     to: process.env.MAILER_EMAIL,
//     subject: "New User",
//     html: `
//         <div style="text-align:left; min-height:100vh; padding:20px">

//          <h2>name: ${name}, <br/></h2>
//          <h2>name: ${email}, <br/></h2>
//         </div>
//         `,
//   };
//   transporter2.sendMail(mailOptions2, function (error, body) {
//     if (error) {
//       return res.json({ error: error });
//     }
//     res.status(StatusCodes.CREATED).json({ user: { name: user.name }, token });
//   });
// };

// const generalUpdate = async (req, res, next) => {
//   try {
//     const user = await User.findOneAndUpdate(
//       { email: req.body.email },
//       req.body,
//       {
//         new: true,
//         runValidators: true,
//       },
//     );
//     if (!user) {
//       return res.json({ error: `No transaction with email found 404` });
//     }

//     res.status(StatusCodes.CREATED).json({ user });
//   } catch (error) {
//     console.log(error);
//   }
// };

// module.exports = {
//   getallnemail,
//   deleteOnenemail,
//   createNewsletterEmail,
//   generalUpdate,
//   getOnenemail,
// };
