<<<<<<< HEAD
const userModel = require("../model/userSchema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")

exports.home = (req, res) => {

    res.send('Welcome to your home page');
};

exports.createUser = async (req, res) => {

    try{

    const {name, email, password} = req.body;

    if(!name || !email || !password){
        throw new Error("Please Enter your name , email and password");
    };

    const userExists = await userModel.findOne({email});

    // To check whether the email id is already there in database

    if(userExists){
        throw new Error("Email address already exist")
    }
    
    // Encrypting the password recieved from user using bcrypt 

    const encryptedpwd = await bcrypt.hash(password, 10);

    const userCreated = await userModel.create({
        name, 
        email,
        password: encryptedpwd
    });

    // Assigning token for every new user

    const token = jwt.sign({
        id: userCreated._id,
        email,
    },
    "dont tell anyone",
    {expiresIn: "3h"}
    )

    userCreated.token = token;
    userCreated.password = undefined;
    
    res.status(201).json({
        success: true,
        message: "User created successfully",
        userCreated
    })
}

catch(err){
    console.log(err);
    res.status(400).json({
        success: false,
        message: err.message
    })
}

};

exports.getUsers = async (req, res) => {

    /* try catch will try to find the users and if it succeeds to find status 200 will be      executed
       else catch block will be executes */
    
       const {email, password} = req.body;
    try{
        const findUser = await userModel.findOne({email});
        res.status(200).json({
            success: true,
            message: "Users found successfully",
            findUser
        })
    }

    catch(err){
        console.log(err);
        res.status(404).json({
            success: false,
            message: err.message
        })
    }
    
};

exports.editUser = async (req, res) =>{

    try{
      const editedUser = await userModel.findByIdAndUpdate(req.params.id, req.body);
      res.status(202).json({
        success: true,
        message: "User edited and updated successfully",
        editedUser
      })

    }

    catch(err){
        console.log(err);
        res.status(404).json({
            success: false,
            message: err.message
        })
    }
};

exports.deleteUser = async (req, res) =>{

    try{
        const deletedUser = await userModel.findByIdAndDelete(req.params.id, req.body);

        res.status(202).json({
            success: true,
            message: "User deleted successfully",
            deletedUser

          })

    }

    catch(err){
        console.log(err);
        res.status(404).json({
            success: false,
            message: err.message
        })
    }

}

exports.userLogin = async (req, res) => {

    try{
    const {email, password} = req.body;
    const userLogged = await userModel.findOne({email});

    if(!userLogged){
        throw new Error("Invalid Credentials")
    }

    if(userLogged && (await bcrypt.compare(password, userLogged.password))){
        const token = jwt.sign({id: userLogged._id, email}, "dont tell anyone", {expiresIn: "3h"});
        

        userLogged.password = undefined;
        userLogged.token = token;

        const options = {
            expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
            httpOnly: true
        }
    


    res.status(200).cookie("token", token, options).json({
        success: true,
        token,
        userLogged
    })
    }

    else{
        throw new Error("Invalid Credentials")
    }

    }

    catch(err){
        console.log(err);
        res.status(400).json({
            success: false,
            message: err.message
        })
    }
}
=======
const userModel = require("../model/userSchema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")

exports.home = (req, res) => {

    res.send('Welcome to your home page');
};

exports.createUser = async (req, res) => {

    try{

    const {name, email, password} = req.body;

    if(!name || !email || !password){
        throw new Error("Please Enter your name , email and password");
    };

    const userExists = await userModel.findOne({email});

    // To check whether the email id is already there in database

    if(userExists){
        throw new Error("Email address already exist")
    }
    
    // Encrypting the password recieved from user using bcrypt 

    const encryptedpwd = await bcrypt.hash(password, 10);

    const userCreated = await userModel.create({
        name, 
        email,
        password: encryptedpwd
    });

    // Assigning token for every new user

    const token = jwt.sign({
        id: userCreated._id,
        email,
    },
    "dont tell anyone",
    {expiresIn: "3h"}
    )

    userCreated.token = token;
    userCreated.password = undefined;
    
    res.status(201).json({
        success: true,
        message: "User created successfully",
        userCreated
    })
}

catch(err){
    console.log(err);
    res.status(400).json({
        success: false,
        message: err.message
    })
}

};

exports.getUsers = async (req, res) => {

    /* try catch will try to find the users and if it succeeds to find status 200 will be      executed
       else catch block will be executes */
    
       const {email, password} = req.body;
    try{
        const findUser = await userModel.findOne({email});
        res.status(200).json({
            success: true,
            message: "Users found successfully",
            findUser
        })
    }

    catch(err){
        console.log(err);
        res.status(404).json({
            success: false,
            message: err.message
        })
    }
    
};

exports.editUser = async (req, res) =>{

    try{
      const editedUser = await userModel.findByIdAndUpdate(req.params.id, req.body);
      res.status(202).json({
        success: true,
        message: "User edited and updated successfully",
        editedUser
      })

    }

    catch(err){
        console.log(err);
        res.status(404).json({
            success: false,
            message: err.message
        })
    }
};

exports.deleteUser = async (req, res) =>{

    try{
        const deletedUser = await userModel.findByIdAndDelete(req.params.id, req.body);

        res.status(202).json({
            success: true,
            message: "User deleted successfully",
            deletedUser

          })

    }

    catch(err){
        console.log(err);
        res.status(404).json({
            success: false,
            message: err.message
        })
    }

}

exports.userLogin = async (req, res) => {

    try{
    const {email, password} = req.body;
    const userLogged = await userModel.findOne({email});

    if(!userLogged){
        throw new Error("Invalid Credentials")
    }

    if(userLogged && (await bcrypt.compare(password, userLogged.password))){
        const token = jwt.sign({id: userLogged._id, email}, "dont tell anyone", {expiresIn: "3h"});
        

        userLogged.password = undefined;
        userLogged.token = token;

        const options = {
            expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
            httpOnly: true
        }
    


    res.status(200).cookie("token", token, options).json({
        success: true,
        token,
        userLogged
    })
    }

    else{
        throw new Error("Invalid Credentials")
    }

    }

    catch(err){
        console.log(err);
        res.status(400).json({
            success: false,
            message: err.message
        })
    }
}
>>>>>>> 0ac02c6ab51fba936ab041e0bb43dabc7d6678a2
