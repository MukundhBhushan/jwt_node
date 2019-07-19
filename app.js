const express = require('express')
const jwt = require('jsonwebtoken')

const app = express()

app.get('/api',(req,res)=>{
    res.json({
        message:'hello'
    })
})

app.post('/api/post',verifyToken,(req,res)=>{
    jwt.verify(req.token,'secretkey',(err,authdata)=>{
        if(err){
            res.json({
                message:'error'
            })
        }
        else{
            res.json({
                message:'created',
                authdata
            })
        }
    })

})

app.post('/api/login',(req,res)=>{
    //TODO: DB stuff
    const user={
        id:1,
        username: 'Mukundh',
        email: 'muk@gmail.com'
    }
    jwt.sign({user}, 'secretkey',{expiresIn:'30s'},(err,token)=>{
        res.json({
            token
        })
    } )
})

function verifyToken(req,res,next){
    //get auth header value
    //Token format:
    //Autherization: Bearer <access_token>
    const bearerHeader = req.header['authorization']
    console.log(bearerHeader)
    //check if bearer is undefined
    if(typeof bearerHeader !== 'undefined') {
        // Split at the space
        const bearer = bearerHeader.split(' ');
        // Get token from array
        const bearerToken = bearer[1];
        // Set the token
        req.token = bearerToken;
        // Next middleware
        next();
    }
    else{
        //fail
        res.json({
            message:'error'
        })
    }
}

app.listen(5000,console.log('server: 5000'))

