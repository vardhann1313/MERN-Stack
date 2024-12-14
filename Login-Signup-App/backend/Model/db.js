const mongoose = require('mongoose')
require('dotenv').config();

const mongo_url = process.env.MONGO_CONN;

if(!mongo_url){
    console.log("Incorrect Mongo URL : ", mongo_url);
}else{
    mongoose.connect(mongo_url).then(()=>{
        console.log("MongoDB Connected !")
    }).catch((err)=>{
        console.log("MongoDB Connection Error : ", err)
    })
}

