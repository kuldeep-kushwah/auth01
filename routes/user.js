const express=require('express');
const app=express();
const router=express.Router();
const bodyparser=require('body-parser');
const mongoose =require('mongoose');
const usermodel=mongoose.model('users',{name:'string', username:'string', password:'string'});


router.post('/register',(req,res)=>{
    var user={
        name:req.body.name,
        username:req.body.username,
        password:req.body.password
    }
   
    var newuser=new usermodel(user);
    newuser.save((err)=>{
        if(err)
        res.send('something went wrong, data can not be saved');
        else
        res.send('data added successfully!');
    })
})



router.post('/login',(req,res)=>{
    var user={
        username:req.body.username,
        password:req.body.password
    }
     
    usermodel.find({username:req.body.username, password:req.body.password},(err,document)=>{
        if(err)
        {
          res.send('something went wrong please wait!');
        }
        else{
            if(document.length==0)
            res.send('username or password incorrect')
            else
            res.send('logged in successfully!');
        }
    })
    
})

module.exports=router;


