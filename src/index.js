const express = require('express');
const { connect } = require('http2');
const app = express();
app.use(express.json());
const connect = require("./configs/db")

const rigesterControl = require("./controls/user.control");
app.use("/register" , rigesterControl)

const loginControl = require("./controls/login.control");
app.use("/login" , loginControl)

const todoControl = require("./controls/todo.control");
app.use("/todo" , todoControl)


app.listen(5000 , async()=>{
    try{
        await connect();
        console.log("i am connected")
    }
    catch(err)
    {
        console.log(err.message)
    }
})