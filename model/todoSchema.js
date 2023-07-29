
const { text } = require("express");
const mongoose = require("mongoose");

// Creating schema for todo with a title field and a task field
const {Schema, model} = mongoose

const todoSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        maxLength: [50, "Title name must not exceed 50 charecters"],
        date: { type: Date, default: Date.now }
    },

    
    tasks: {
        type: [String],
        // required: true,
        date: { type: Date, 
        default: Date.now }
    },

    userId:{
        type: Schema.Types.ObjectId,
        ref: "User",
        // required: [true, "Please enter User IDd"]
    },
},

    {
    timestamps: true,
    
    } 


);

todoSchema.index({'$**': "text" })

// const Title = mongoose.model("Title", todoSchema);


module.exports = mongoose.model("Todos", todoSchema);
// module.exports = Tasks;