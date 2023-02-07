const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const auth1 = require("../middleware/auth");
const User = require("../models/user.model");
const nodemailer = require('nodemailer')
const sendgridTransport = require('nodemailer-sendgrid-transport')
const crypto = require('crypto')
var bodyParser = require('body-parser')
const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req,file,callback)=>{
    callback(null,'./uploads/');
    // callback(new Error("The file destination does not exist"),'/uploads');
  },
  filename:(req,file,callback)=>{
    callback(null,`${file.originalname}`);
  }
});


const fileFilter = (req,file,callback)=>{
  //here apply filters

  // if(file.mimetype==='image/png'||file.mimetype==="image/jpg"){
  //   callback(null,true);
  // }
  // else{
  //   callback(new Error("The filetype does not match the requirement"),false);
  // }

  callback(null,true);
}
const upload = multer({
  storage:storage,
  // limits:{
  //   fileSize:1024*1024*5
  // },
  // fileFilter:fileFilter
});

var jsonParser = bodyParser.json()
 
// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })

const transporter = nodemailer.createTransport(sendgridTransport({
  auth: {
    api_key: "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"
  }
}))
router.post("/register",upload.single('profilePicture'), async (req, res) => {
  // console.log(req.file)
  try {
    let { email, password, passwordCheck, displayName} = req.body;
    const profilePicture = req.file.path;

    // validate

    if (!email || !password || !passwordCheck)
      return res.status(400).json({ msg: "Not all fields have been entered." });
    if (password.length < 8)
      return res
        .status(400)
        .json({ msg: "The password needs to be at least 8 characters long." });
    if (password !== passwordCheck)
      return res
        .status(400)
        .json({ msg: "Enter the same password twice for verification." });

    const existingUser = await User.findOne({ email: email });
    if (existingUser)
      return res
        .status(400)
        .json({ msg: "An account with this email already exists." });

    if (!displayName) displayName = email;

    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    const newUser = new User({
      email,
      password: passwordHash,
      displayName,
      profilePicture,
    });
    const savedUser = await newUser.save();
    res.json(savedUser);
    transporter.sendMail({
      to: savedUser.email,
      from: "FA17-BCS-070@isbstudent.comsats.edu.pk",
      subject: "Sign up success",
      html: "<h1>Welcome to Agricultural Dashboard</h1>"
    })
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // validate
    if (!email || !password)
      return res.status(400).json({ msg: "Not all fields have been entered." });

    const user = await User.findOne({ email: email });
    if (!user)
      return res
        .status(400)
        .json({ msg: "No account with this email has been registered." });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid credentials." });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    res.status(200).json({
      token,
      user: {
        id: user._id,
        displayName: user.displayName,
        email: user.email,
        picture: user.profilePicture
      },
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

//
router.post("/change", async (req, res) => {
  try {
    const { email, password } = req.body;

    // validate
    if (!email || !password)
      return res.status(400).json({ msg: "Not all fields have been entered." });

    const user = await User.findOne({ email: email });
    if (!user)
      return res
        .status(400)
        .json({ msg: "No account with this email has been registered." });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid credentials." });


    const newPassword = req.body.newpassword
    User.findOne({ email: req.body.email })
      .then(user => {
        if (!user) {
          return res.status(422).json({ error: "User doesn't exist with that email" })
        }
        bcrypt.hash(newPassword, 12).then(hashedpassword => {
          user.password = hashedpassword
          user.resetToken = undefined
          user.expireToken = undefined
          user.save().then((savedUser) => {
            res.json({ message: "Password Updated successfully" })
          })
        }).catch(err => {
          console.log(err)
        })


      })
    res.status(200).json({
      user: {
        id: user._id,
        displayName: user.displayName,
      },
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/reset', async (req, res) => {

  crypto.randomBytes(32, (err, buffer) => {
    if (err) {
      console.log(err)
    }
    const token = buffer.toString("hex")
    User.findOne({ email: req.body.email })
      .then(user => {
        if (!user) {
          return res.status(422).json({ error: "User doesn't exist with that email" })
        }
        user.resetToken = token
        user.expireToken = Date.now() + 1800000
        user.save().then((result) => {
          transporter.sendMail({
            to: user.email,
            from: "FA17-BCS-070@isbstudent.comsats.edu.pk",
            subject: "password reset",
            html: `<p>You requested for password reset</p>
            <h5>Click on this <a href="http://localhost:3000/NewPassword/${token}">link</a> to reset your password</h5>
            `
          })
          res.json({ message: "check your email" })
        })

      })
  })
})

router.post('/NewPassword', (req, res) => {
  const newPassword = req.body.password
  const sentToken = req.body.token
  User.findOne({ resetToken: sentToken, expireToken: { $gt: Date.now() } })
    .then(user => {
      if (!user) {
        return res.status(422).json({ error: "Try Again session expired" })
      }
      bcrypt.hash(newPassword, 12).then(hashedpassword => {
        user.password = hashedpassword
        user.resetToken = undefined
        user.expireToken = undefined
        user.save().then((savedUser) => {
          res.json({ message: "Password Updated successfully" })
        })
      }).catch(err => {
        console.log(err)
      })
    })
})

router.delete("/delete", auth1, async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.user);
    res.json(deletedUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/tokenIsValid", async (req, res) => {
  try {
    const token = req.header("x-auth-token");
    if (!token) return res.json(false);

    const verified = jwt.verify(token, process.env.JWT_SECRET);
    if (!verified) return res.json(false);

    const user = await User.findById(verified.id);
    if (!user) return res.json(false);

    return res.json(true);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/", auth1, async (req, res) => {
  const user = await User.findById(req.user);
  res.json({
    displayName: user.displayName,
    id: user._id,
  });
});

module.exports = router;