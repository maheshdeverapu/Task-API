const express = require("express");
const index = express();
const mongoose = require("mongoose");
const {MONGOURI} = require("./keys");
const port = 5000;
mongoose.set('strictQuery', false);
mongoose.connect(MONGOURI,{useNewUrlParser:true, useUnifiedTopology:true})
mongoose.connection.on('connected',()=>{
    console.log("connected to database wohoo!")
})
mongoose.connection.on('err',(err)=>{
    console.log("error occured",err)
})
index.use(express.json());
index.use(require("./userData/transactions.js"));
index.get("/",(req,res)=>{
    res.send("i am from home")
})

index.listen(port,()=>{console.log(`server is up at port ${port}`)})