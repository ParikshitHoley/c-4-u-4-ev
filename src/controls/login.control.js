
const express = require("express");
const router = express.Router();
const User = require("../models/user.model")
var jwt = require('jsonwebtoken');
require('dotenv').config()


const generateToken = (user)=>{
    return jwt.sign({ user }, process.env.KEY);
}

router.post("", async(req,res)=>{
    let user = await User.findOne({email : req.body.email});
    if(!user)
    {
        return res.status(400).send("user not exist")
    }
    else{
        const match = user.checkPassword(req.body.password);

        if(!match)
        {
            return res.status(400).send("wrong password")
        }
        else{
            const token = generateToken(user);
            return res.status(200).send({ user, token})

        }
    }
})

module.exports=router;