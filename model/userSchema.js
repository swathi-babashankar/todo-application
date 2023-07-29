const mongoose = require("mongoose");


const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: [true,"Please Enter Your name"],

    },

    email:{
        type: String,
        unique: true,
        required: [true, "Please enter your email address"],
    },

    password:{
         type: String,
         required: [true, "Please enter the password" ]
    },

    todoId:{
        type: [{ type: mongoose.Schema.Types.ObjectId,
        ref: "Todos",
    }]

    },

    token:{
        type: String
    }
    


},

{
    timestamps: true
});



const userModel = mongoose.model("User", userSchema);
module.exports = userModel;