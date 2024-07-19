const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');


const BookSchema = new mongoose.Schema({
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    genre: {
      type: String,
      required: true,
    },
    publishDate: {
      type: Date,
    //   required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    tags: [{
      type: String,
      required: true,
    }],
    cover: {
      type: String,
      required: true,
    },
    chapters: [{
      type: mongoose.Schema.Types.ObjectId,
      ref : "Chapter",
    //   required : true,
    }],
    Status : {
        type : String,
        enum : ["Published", "Draft"],
        default : "Draft",
    },
    author : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User",
    },
    ratingAndReview : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "RatingAndReview",
    }
});

BookSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Book', BookSchema);
  