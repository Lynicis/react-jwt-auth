const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require('path');

// for auth
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const { db } = require("./lib/db");
require("dotenv").config();

// for secure in also file 
const controlToken = require('./lib/token');

const app = express();
const port = 1881;

// for remote access api
app.use(cors());

// parsing and get body values
// examp: req.body.x
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post("/api/login", (req, res) => {
  if (!req.body.username || !req.body.password) {
    res.status(401).json({ message: "empty areas" });
  } else {
    const pwd = crypto.pbkdf2Sync(req.body.password, process.env.HASH_KEY, 1000, 64, 'sha512').toString('hex');
    const query = `SELECT id, email FROM users WHERE username='${req.body.username}' AND password='${pwd}'`;
    db.query(query, (err, result) => {
      if (err) res.status(500).send(err);
        if(result.length > 0){
            const token = jwt.sign(
                { uid: result[0].id, uname: req.body.username, email: result[0].email },
                process.env.SECRET_KEY,
                {
                  algorithm: "HS256",
                  expiresIn: "1h",
                })
                req.headers.authorization = token;
                res.status(200).json({ message: "successfuly login", token, success: true });
        }else{
            res.status(401).json({message: "username or password wrong"})
        }
    });
  }
});

app.post("/api/register", (req,res)=>{
  if(!req.body.email || !req.body.username || !req.body.password){
    res.status(401).json({message: 'empty areas'})
  }else{
    const pwd = crypto.pbkdf2Sync(req.body.password, process.env.HASH_KEY,  1000, 64, 'sha512').toString('hex');
    const query = `INSERT INTO users VALUES (null, '${req.body.email}', '${req.body.username}', '${pwd}')`;
    db.query(query, (err,result)=>{
      if(err) res.status(500).send(err);
      res.status(200).json({message: 'user saved'})
    })
  }
});

app.get("/api/data", controlToken, (req,res)=>{
  res.sendFile(path.join(__dirname + '/lib/fakeData.json'));
});

app.listen(port, () => {
  console.log(`Server listening PORT: ${port}`);
});
