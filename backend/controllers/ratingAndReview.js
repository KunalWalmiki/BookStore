const User = require("../models/user");
const Book = require("../models/Book");
const RatingAndReview = require("../models/RatingAndReview");

//createRating handler
exports.createRating = async(req, res) => {

    try {

          //extract user id
          const userID = req.user.id;

          //extract review rating and courseID
          const {review, rating, BookId} = req.body;

          console.log(review, rating, BookId);

          //validation
          if(!review || !rating || !BookId) {

              return res.status(401).json({
                   success : false,
                   message : 'All Fields Are Required',

              });

          }

          //find the book exist with the bookId
          const book = await Book.findOne({_id : BookId});
        
          //if not found any book with provided id
          if(!book) {
              
              return res.status(401).json({
                   success : false,
                   message : 'Book not found with provided Id',

              });
          }

          console.log(book);

          //find if user already reviewed or not
          const alreadyReviewed = await RatingAndReview.findOne({user : userID, book : BookId });

          //if reviewd then return res
          if(alreadyReviewed) {

               return res.status(401).json({
                   success : false,
                   message : 'User Already Shared Review On This Book'
               });
          }

          //create rating
          const newRatingAndReview = await RatingAndReview.create({
                                     rating, review,
                                     book : BookId,
                                     user : userID, 
          });

          console.log(newRatingAndReview);

          //update Book 
          const updatedBookDetails = await Book.findByIdAndUpdate(
                                                    {_id : BookId},
                                                    {
                                                        $push : {
                                                               ratingAndReview : newRatingAndReview._id,
                                                        }
                                                    },
                                                    {new : true});

            console.log(updatedBookDetails);

          //return res
          return res.status(200).json({
               success : true,
               message : 'Thanks For Your Rating And Reviews',
               rating,
               review,
          })

    } catch (error) {

        console.log(error);
        console.error(error);

        return res.status(500).json({
            success : false,
            message : 'Something Went Wrong While Rating',
            error : error.message,

        });
    }
}