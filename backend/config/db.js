const mongoose = require("mongoose");
require("dotenv").config();

const DB_URL = process.env.DATABASE_URL;

exports.dbConnect = () => {

    mongoose.connect(DB_URL)
    .then(() => {
        console.log("DB Connected Successfuly");
    })
    .catch((e) => {
        console.log("Failed To Connect DB ", e);
    })
    
}