require('dotenv').config()
const express=require('express');
var app=express();
const path=require('path');
const bodyparser=require('body-parser');
app.use(bodyparser.urlencoded({extended:true}));
app.use(bodyparser.json());
const mongoose=require('mongoose');
const userroute=require('./routes/user')
const DB=process.env.db;


// mongoose.connect('mongodb://localhost:27017/faltoo1',(err)=>{
//     if(err)
//     console.log('something went wrong while connection');
//     else
//     console.log('mongodb Connection established successfully!');
// })

mongoose.connect(DB,(err)=>{
    if(err)
    console.log('something went wrong while connection');
    else
    console.log('mongodb Connection established successfully!');
})

//const usermodel=mongoose.model('users',{name:'string', username:'string', password:'string'});
const pathline=path.join(__dirname,"build");



app.use(express.static(pathline));

// app.use('/',(req,res)=>{
//     res.sendFile(pathline);
//  });


app.use('/api/user',userroute);



app.use('/',(req,res)=>{
    res.send('This is server node.js and working fine');
})



const port=process.env.PORT || 5000;
app.listen(port,()=>{
    console.log('connection established! on port:'+port);
})
