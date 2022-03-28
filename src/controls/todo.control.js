const express = require("express");
const router = express.Router();
const Todo = require("../models/todo.model");
const User = required("../models/user.model")
const auth = require("../middel/auth");

router.post("" , auth, async(req,res)=>{
    let userid = req.user._id;
    try{
        const todo = await Todo.create({
            title : req.body.title,
            userId : userid
        });
        return res.status(200).send(todo)
    }
    catch(err)
    {
        return res.status(500).send(err.message)
    }
})

router.get("/:Id" , auth , async(req,res)=>{
    if(req.params.Id !== req.user._id)
    {
        return false;
    }
    try{
        const todo = await User.find(req.body.Id);
        res.status(200).send(todo);
    }
    catch(err)
    {
        return res.status(500).send(err.message);
    }
})

router.patch("/:Id" ,auth ,  async(req,res)=>{
    if(req.params.Id !== req.user._id)
    {
        return false;
    }
     try{
         const todo = await Todo.findByIdAndUpdate(req.body);
         res.status(200).send(todo)
     }
     catch(err)
     {
         return res.status(500).send(err.message);
     }
})

module.exports=router;