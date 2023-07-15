
const { json, urlencoded } = require("express");
const cors = require("cors")
const express = require("express");
const connectToDataBase = require("./config/database")
const app = express();
const todoRoutes = require ("./routes/todoRoutes");
const userRoutes = require("./routes/userRoutes");
const cookieParser = require("cookie-parser");
// const taskRoutes = require("./routes/taskRoutes");


// middleware

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors());
app.use(cookieParser());

connectToDataBase();

app.use("/", todoRoutes);
app.use("/", userRoutes);

module.exports = app;