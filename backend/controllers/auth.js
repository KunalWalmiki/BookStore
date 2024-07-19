const User = require("../models/user")
const bcrypt = require("bcryptjs");
const jwt = require( "jsonwebtoken");
require("dotenv").config();

exports.signup = async(req , res) => {

    try {

        const {
             firstName, 
             lastName,
             email, 
             password, 
             accountType
        } = req.body;

        if(!firstName || !lastName || !email || !password 
        || !accountType) {

            return res.status(401).json({
                success : false,
                message : "All Fields Are Required",
            });
        }

        const existingUser = await User.findOne({email : email});

        if(existingUser) {

            return res.status(401).json({
                success : false,
                message : "Email is Already Registerd",
            })
        }

        let hashedPassword;
        try {

            hashedPassword = await bcrypt.hash(password, 10);

        } catch(error) {

            console.log(error);

        }

        const newUser = await User.create({
            firstName,
            lastName,
            email,
            password : hashedPassword,
            accountType,
        });
        
        
        return res.status(200).json({
            success : true,
            message : "Registeration Successful",
            newUser,
        })
        
    } catch(error) {

        console.log(error);
        return res.status(501).json({
            success : false,
            message : error,
        })
    }
}

exports.signin = async(req, res) => {

    try {

        // destruct email password
        const {email, password} = req.body;
        // console.log(email, password);
        //validate
        if(!email || !password) {

            return res.status(401).json({

                success : false,
                message : "All Field are required",
            });
        }

        //find email
        const user  = await User.findOne({email: email});

        console.log(user);
        //if not found return res not found
        if(!user) {

            return res.status(401).json({
                success : false,
                message : "Your Email Is Not Registered With Us.",
            });
        }

        //validate password and generate jwt token
        if(await bcrypt.compare(password, user.password)) {

            // create payload
            const payload = {
                email : user.email,
                id : user._id,
                accountType : user.accountType,
            }

            // create token
            const token = jwt.sign(payload, process.env.jwt_secret || "Decode",
                                   { expiresIn : "7h"});

            user.token = token,
            user.password = "";

            const options = {
                expires : new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
                httpOnly : true,
            }

            res.cookie("token", token, options).status(200).json({
                success : true,
                token,
                user,
                message : "Logged In Successfuly",
            });

        }
        else {

            return res.status(401).json({
                success : false,
                message : "Incorrect Password",
            });

        }
    
    } catch(error) {

        console.log(error);
        console.error(error);
        return res.status(500).json({
            success : false,
            message : 'Something went wrong login failure, please try again later',
        })

    }
}

exports.verify = async(req, res) => {
   
    const token = req.query.token;

    try {
      const decoded = jwt.verify(token, process.env.jwt_secret);
  
      const user = await User.findOne({ email: decoded.email });

      if (!user) {
        return res.status(400).json({
            success : false,
            message : "Invalid Token"
        });
      }
  
      if (user?.expiresAt && user.expiresAt < new Date()) {
        return res.status(400).json({
            success : false,
            message : 'Verification token has expired'
        });
      }
  
      user.isVerified = true;
      user.verificationToken = '';
      user.expiresAt = null;
      await user.save();
  
      res.status(200).json({
        success : true,
        message : 'Email verified successfully'
      });

    } catch (error) {
      console.log(error)
      res.status(400).json({
        success : false,
        message : 'Invalid token'
      });
    }
}

