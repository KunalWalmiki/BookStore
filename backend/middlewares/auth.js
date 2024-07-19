const jwt = require("jsonwebtoken");
require('dotenv').config();

exports.auth = async(req, res, next) => {

    try {

        // extract token
        const token = req.body.token || req.cookies.token 
        || (req.header("Authorization") && req.header("Authorization")?.replace("Bearer ", ""));

        // console.log(token);

        // validate token
        if(!token) {

            return res.status(401).json({
                success : false,
                message : "Token Is Missing",

            })
        }

        // decode token
        try {

            const payload = jwt.verify(token, process.env.jwt_secret || "Decode");

            console.log(payload);

            // inser decoded token in user
            req.user =  payload;

        } catch(error) {

            return res.status(401).json({
                success : false,
                message : 'Invalid Token',

               });
        }
        next();

    } catch(error) {

        console.error(error);

        return res.status(500).json({
            success : false,
            message : 'Something went wrong while authentication of the user',
            error : error,
        });
        
    }
}

//isReader
exports.isReader = async(req, res, next) => {

    try{

          if(req.user.accountType !== "Reader"){

            return res.status(401).json({
                success : false,
                message : 'This is a protected route only for Readers',
            });

          }
          next();

    } catch (error) {

        return res.status(500).json({
            success : false,
            message : 'User role cannot be verified, Please try again later',
        })
    }
}

//isAuthor
exports.isAuthor = async(req, res, next) => {

    try{

          if(req.user.accountType !== "Author"){

            return res.status(401).json({
                success : false,
                message : 'This is a protected route only for Authors',
            });

          }
          next();

    } catch (error) {

        return res.status(500).json({
            success : false,
            message : 'User role cannot be verified, Please try again later',
        })
    }
}