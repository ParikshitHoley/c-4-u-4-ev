const express = require("express");
const router = express.Router();
const User = require("../models/user.model")
var jwt = require('jsonwebtoken');
require('dotenv').config()

router.post("" , async(req,res)=>{
    try{
        let user = await User.findOne({email : req.body.email});
        if(user)
        {
            return res.status(400).send("user already exist");
        }
        else{
            user = await User.create(req.body);
            const token = generateToken(user);
            res.status(200).send({ user , token})
        }
    }
    catch(err)
    {
        return res.status(500).send(err.message)
    }
})

const generateToken = (user)=>{
    return jwt.sign({ user }, process.env.KEY);
}



module.exports=router;