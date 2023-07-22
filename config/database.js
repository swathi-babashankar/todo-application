
// importing mongoose from express to connect the database

const mongoose = require("mongoose");
require("dotenv").config();


// Defining a function which is wrapped with the database connection code

const connectToDataBase = () =>{
    mongoose.connect(process.env.MONGO_URL,{useNewUrlParser: true})
    .then((con) =>{
        console.log("connected to db");
    })
    .catch((err) =>{
        console.log(err.message);
        process.exit(1);
    })
}

module.exports = connectToDataBase;
// process.env.MONGO_URL,{useNewUrlParser: true}