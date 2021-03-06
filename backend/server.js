const express = require('express');
const fs = require('fs');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const md5 = require('md5');
const PORT = 4000;
const userModel = require("./model/user");

app.use(cors());
app.use(bodyParser.json());
app.use(cookieParser());
app.set("view engine", "ejs");

var multer = require('multer');
 
var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now())
    }
});
 
var upload = multer({ storage: storage });

app.post('/signup', (req, res) => {
    userModel.findOne({email:req.body.email}, (err, user) =>{
        if(!user){
            userModel.insertMany(req.body);
            res.status(200).send(req.body)
        }
        else{
            return res.json({
                success:false
            })
        }
    })
});

app.post('/login', (req, res) => {   
    userModel.findOne({email:req.body.email}, (err, user) => {
        if(!user){
            return res.json({
                mailloginSuccess: false,
                message:"Wrong Email",
            })
        }
        else{
            const compare = md5(req.body.password) == user.password
            if(compare == true){
                user.generateToken((err, user) => {
                    if(err) return res.status(400).send(err);
                    res.cookie("user_cookie", user.token, { httpOnly: false, secure: false })
                    .status(200).json({
                        loginSuccess: true,
                        message:user.token,
                        name:user.name
                    })
                })                           
            }
            else{
                return res.json({
                    passwordloginSuccess:false,
                    message:"Wrong Password"
                })
            } 
        }        
    }) 
     
});

app.listen(PORT, function() {
    console.log("Server is running on Port: " + PORT);
});