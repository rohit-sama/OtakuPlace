const express = require("express");
const cors = require("cors");
const { default: mongoose } = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("./models/User.js");
const Place = require("./models/Place.js");
const cookieParser = require("cookie-parser");
const multer = require("multer");
const imageDownloader = require("image-downloader");
const fs = require("fs");
const { Console } = require("console");
require("dotenv").config();
const app = express();

const secretpass = bcrypt.genSaltSync(10);
const jwtsecret = "dfsgtrhthghgfnbvcbc";

app.use(express.json());
app.use(cookieParser());
app.use("/uploads", express.static(__dirname + "/uploads"));
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173",
  })
);

mongoose.connect(process.env.MONGO_URL);
app.get("/test", (req, res) => {
  res.json("test ok");
});

app.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const user = await User.create({
      name,
      email,
      password: bcrypt.hashSync(password, secretpass),
    });
    res.json(user);
  } catch (e) {
    res.status(422).json(e);
  }
});

// app.post('/login', async (req,res) => {
//   const {email,password} = req.body;
//   const user =  await User.findOne({email});

//  if(user) {
//   const passOk = bcrypt.compareSync(password, user.password);
//   if (passOk){
//     jwt.sign({email:user.email, id:user._id, name:user.name}, jwtsecret, {}, (err,token) => {
//       if (err) throw err;
//       res.cookie('token', token).json(user);

//     });
//   }else{
//     res.status(422).json("password incorrect")
//   }
//  }else{
//   res.json('not found')
//  }
// });

app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required." });
  }

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (isPasswordValid) {
      jwt.sign(
        { email: user.email, id: user._id, name: user.name },
        jwtsecret,
        {},
        (err, token) => {
          if (err) {
            throw err;
          }

          res.cookie("token", token).json(user);
        }
      );
    } else {
      return res.status(401).json({ error: "Incorrect password." });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error." });
  }
});

app.get("/profile", (req, res) => {
  const { token } = req.cookies;
  if (token) {
    jwt.verify(token, jwtsecret, {}, (err, user) => {
      if (err) throw err;
      res.json(user);
    });
  } else {
    res.json("error finding the user");
  }
});

app.post("/logout", (req, res) => {
  res.cookie("token", "").json(true);
});

app.post("/upload-by-link", async (req, res) => {
  const { link } = req.body;
  const newname = "photo" + Date.now() + ".jpg";
  await imageDownloader.image({
    url: link,
    dest: __dirname + "/uploads/" + newname,
  });
  res.json(newname);
});

const photoUpload = multer({ dest: "uploads" });
app.post("/upload", photoUpload.array("photos", 100), (req, res) => {
  const uploadedfiles = [];
  for (let i = 0; i < req.files.length; i++) {
    const { path, originalname } = req.files[i];
    const parts = originalname.split(".");
    const ext = parts[parts.length - 1];
    const newpath = path + "." + ext;
    fs.renameSync(path, newpath);
    uploadedfiles.push(newpath.replace("uploads/", ""));
  }
  res.json(uploadedfiles);
});

app.post("/places", (req, res) => {
  const { token } = req.cookies;
  const { title, address, addedphoto, description, extrainfo } = req.body;
  jwt.verify(token, jwtsecret, {}, async (err, user) => {
    if (err) throw err;
    const placeDoc = await Place.create({
      owner: user.id,
      ownername: user.name,
      title,
      address,
      photos:addedphoto,
      description,
      extrainfo,
    });
    res.json(placeDoc);
  });
});

app.get('/allplaces', async(req, res) => {
  try {
    const places = await Place.find();
    res.json(places);
  } catch (error) {
    res.sendStatus(500);
  }
});



app.get('/places', (req,res) => {
  const { token } = req.cookies;
  jwt.verify(token, jwtsecret, {}, async (err, user) => {
    const {id} = user;
    res.json( await Place.find({owner:id}));
  });
});


app.get('/places/:id',async (req,res) => {
  const {id} = req.params;
  res.json(await Place.findById(id));
})
app.listen(4000);
