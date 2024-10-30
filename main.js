const express=require('express');
const app=express();

app.use(express.json())

const users=[];

function generateToken(){
    let options=['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
    let token="";
    for(let i=0;i<32;i++){
        token+=options[Math.floor(Math.random()*options.length)]
    }
    return token;
}
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
        const token=generateToken();    
        findUser.token=token;
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
    let findUser=users.find(user=>user.token===token);
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