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

mongoose.connect(DB,(err)=>{
    if(err)
    console.log('something went wrong while connection');
    else
    console.log('mongodb Connection established successfully!');
})


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
