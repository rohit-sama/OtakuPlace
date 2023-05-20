const express = require('express');
const cors = require('cors');
const { default: mongoose } = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('./models/User.js');
const cookieParser = require('cookie-parser');
require('dotenv').config();
const app = express();

const secretpass = bcrypt.genSaltSync(10);
const jwtsecret = 'dfsgtrhthghgfnbvcbc';

app.use(express.json());
app.use(cookieParser());
app.use(cors({
  credentials: true,
  origin: 'http://localhost:5173',
}));

mongoose.connect(process.env.MONGO_URL);

app.get('/test', (req, res) => {
  res.json('test ok');
});


app.post('/register', async (req,res) => {
  const {name, email,password} = req.body;
try {
  const user = await User.create({
    name,
    email,
    password:bcrypt.hashSync(password, secretpass),
  });
  res.json(user);
} catch (e) {
  res.status(422).json(e);
}
});


app.post('/login', async (req,res) => {
  const {email,password} = req.body;
  const user =  await User.findOne({email});

 if(user) {
  const passOk = bcrypt.compareSync(password, user.password);
  if (passOk){
    jwt.sign({email:user.email, id:user._id, name:user.name}, jwtsecret, {}, (err,token) => {
      if (err) throw err;
      res.cookie('token', token).json(user);

    });
  }else{
    res.status(422).json("password incorrect")
  }
 }else{
  res.json('not found')
 }
});


app.get('/profile', (req,res) => {
  const {token} = req.cookies;
  if (token) {
    jwt.verify(token, jwtsecret, {} ,(err, user) => {
      if (err) throw err;
      res.json(user)
    });
  } else {
    res.json(null);
  }
});

app.post('/logout' , (req,res) => {
  res.cookie('token', '').json(true);
});

app.listen(4000);