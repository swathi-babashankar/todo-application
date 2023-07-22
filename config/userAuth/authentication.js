const jwt = require("jsonwebtoken")

const authenticate = (req, res, next) => {
    console.log(req.cookies);

    const {token} = req.cookies;

    // Checking if token is there in cookie

    if(!token){
        res.status(404).send("Token is not found")
    }

    try{
        const decode = jwt.verify(token, "dont tell anyone")
        console.log(decode);

        req.user = decode;
    }

    catch(err){
        res.status(404).send("Token is invalid")
    }

    return next()

}

module.exports = authenticate;