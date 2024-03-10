const express = require('express')
const router = express.Router()
const User = require('../models/Users')
const validator = require('validator');

router.post('/login', async (req,res) => {
    try {
        if(!validator.isEmail(req.body.email)){
            res.status(412).json("Invalid Email Id");
        }
        else{
            const result = await User.findOne({email : req.body.email,  password : req.body.password});
            if(result)
                res.send(result);
            else
                res.status(500).json("Email Id or Password did not match");
        }
    } catch (error) {
        res.status(500).json(error);
    }
});

router.post('/register', async (req,res) => {
    try {
        const emailexist = await User.findOne({email : req.body.email});
        if(!validator.isEmail(req.body.email)){
                res.status(412).json("Invalid Email Id");
        }
        else if(!emailexist){
            const newUser = new User(req.body);
            await newUser.save();
            res.send("User Registerd Successfully");
        }
        else{
            res.status(409).json("Email id already in use");
        }
    } catch (error) {
        res.status(500).json(error);
    }
});

module.exports = router