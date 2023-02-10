const express=require('express');
const app=express();
const bcrypt=require('bcryptjs');
const router=express.Router();
const bodyparser=require('body-parser');
const mongoose =require('mongoose');
const usermodel=mongoose.model('users',{name:'string', username:'string', password:'string'});


router.post('/register',(req,res)=>{
    const passwordhash=bcrypt.hashSync(req.body.password,10);
   // let userexist=1;

    var user={
        name:req.body.name,
        username:req.body.username,
        password:passwordhash
    }

    usermodel.find({username:req.body.username},(err,document)=>{
        if(err)
        {
          res.send('something went wrong please wait!');
        }
        else{
            if(document.length!=0){
                userexist=0;
            res.send('user already exist!');
           }
           else{
            var newuser=new usermodel(user);
  
            newuser.save((err)=>{
                if(err)
                res.send('something went wrong, data can not be saved');
                else
                res.send('registration successfull!');
             })
            }
        }
        
    })



    


      
    
})



router.post('/login',(req,res)=>{
 
    
    //secure(req.body.password);
    var user={
        username:req.body.username,
        password:req.body.password
    }
     
    usermodel.find({username:req.body.username},(err,document)=>{
        // const passwordhash=bcrypt.hashSync(req.body.password,10);
         const boolhash=bcrypt.compareSync(req.body.password,document[0].password);
        // console.log(passwordhash);
         //console.log(boolhash);
        
        if(err)
        {
          res.send('something went wrong please wait!');
        }
        else{
            if(document.length==0 || boolhash===false)
            res.send('username or password incorrect')
            else
            res.send('logged in successfully!');
        }
    })
    
})

module.exports=router;


