const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const {mailSender} = require("../utils/mailSender");

const userSchema = new mongoose.Schema({

    firstName : {
        type : String,
        required : true,
    },
    lastName : {
        type : String,
        required : true,
    },
    email : {
        type : String,
        required : true,
    },
    password : {
        type : String,
        required : true,
    },
    accountType : {
        type : String,
        enum : ["Author", "Reader"],
        required : true, 
    },
    books : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : "Book",
        // required : true,
    }],
    isVerified: {
        type: Boolean,
        default: false,
    },
    verificationToken: {
        type: String,
    },
    expiresAt: {
        type: Date,
    },
})


userSchema.pre('save', async function (next) {
     
    const user = this;

    if (user.isNew) {
      const verificationToken = jwt.sign({ email: user.email }, process.env.jwt_secret, { expiresIn: '5m' });
      user.verificationToken = verificationToken;
      user.expiresAt = new Date(Date.now() + 5 * 60 * 1000); // 5 minutes from now
    //   console.log("hello");
    //   console.log(verificationToken);
      // Send verification email
      await mailSender(user.email, "Verfiy Your Email with Below Link", verificationToken);
    }
  
    next();
});

module.exports = mongoose.model("User", userSchema);
