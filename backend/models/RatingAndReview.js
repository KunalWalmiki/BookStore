const mongoose = require("mongoose");

const RatingAndReviewSchema = new mongoose.Schema({

    user : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User",
        required : true,
    },
    rating : {
              
        type : Number,
        required : true,
    },
    review : {
              
        type : String,
        required : true,
    },
    book : {
        type : mongoose.Schema.ObjectId,
        ref : "Book",
        required : true,
    }
}, { timestamps: true }
)


module.exports = mongoose.model("RatingAndReview", RatingAndReviewSchema);
