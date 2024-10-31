const express=require('express');
const jwt=require('jsonwebtoken')
const app=express();
const JWT_SECRET="randomjwtsecret"
app.use(express.json())

const users=[];


console.log(users)
app.post('/signup', function(req, res){
    const username=req.body.username;
    const password=req.body.password;
    users.push({
        username:username,
        password:password
    })
    res.send({
        message:"Signed up by you"
    })
    console.log(users)
})
app.post('/signin', function(req, res){
    const username=req.body.username;
    const password=req.body.password;
    let findUser=null;
    for(let i=0;i<users.length;i++){
        if(users[i].username===username && users[i].password===password){
            findUser=users[i]; break;
        }
    }
    if(findUser){
        const token=jwt.sign({
            username:username
        }, JWT_SECRET);    
        // findUser.token=token;
        console.log(users);
        res.json({
            token:token
        })
    }else{
        res.status(403).send({
            message:"Invalid username or password"
        })
    }
})
app.get('/me', function(req, res){
    const token=req.headers.token;
    const decodedInfo=jwt.verify(token, JWT_SECRET);
    const username=decodedInfo.username
    let findUser=users.find(user=>user.username===username);
    if(findUser){
        console.log('user found ',findUser)
        res.send({
            username:findUser.username
        })
    }else{
        console.log('token in valid or wut');
        res.status(401).send({
            message:"unauthorized."
        })
    }
})
app.listen(3000);