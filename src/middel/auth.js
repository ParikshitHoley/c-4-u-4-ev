var jwt = require('jsonwebtoken');
require('dotenv').config()


const auth = (req,res,next)=>{
    if(!req.headers.authorization)
    {
        return res.status(400).send("token not found")
    }
    if(!req.headers.authorization.startsWith("Bearer "))
    {
        return res.status(400).send("wrong token")
    }
    const token  = req.headers.authorization.split(" ")[1];
    try{
        let decoded = await verifyToken(token)
    }
    catch(err)
    {
        return res.status(500).send(err.message)
    }
    req.user = decoded.user;
    next()
}

const verifyToken=(token)=>{
    return new Promise((resolve,reject)=>{
        var decoded =  jwt.verify(token, process.env.KEY)

        if(err)
        {
            return reject(err.message)
        }
        else{
            return resolve(decoded);
        }
    })
}

module.exports=auth;