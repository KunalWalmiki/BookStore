const User = require("../models/user");
const Book = require("../models/Book");
const Rating = require("../models/RatingAndReview");

exports.topRatedBooks = async (req, res) => {

    try {

        const topRatedBooks = await Book.aggregate([
            {
                $lookup: {
                    from: 'RatingAndReview', // Name of the rating collection
                    localField: 'ratingAndReview',
                    foreignField: '_id',
                    as: 'ratingAndReview',
                },
            },
            {
                $addFields: {
                    averageRating: { $avg: '$ratingAndReview.rating' },
                },
            },
            {
                $sort: { averageRating: -1 }, // Sort by average rating in descending order
            },
            {
                $limit: 10, // Limit to top 10 books
            },
            {
                $project: {
                    title: 1,
                    author: 1,
                    genre: 1,
                    publishDate: 1,
                    averageRating: 1,
                    cover : 1, 
                    price : 1,
                    rating : 1,
                },
            },
        ])

        // console.log(populatedBooks);
        res.status(200).json({
            success: true,
            message: "Top Rated Books fetched Successfuly",
            topRatedBooks,
        });

    } catch (error) {
        console.error('Error fetching top-rated books:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

exports.getAllBooksBySpecificAuthor = async (req, res) => {

    try {

        const { authorId } = req.query;
        console.log(authorId);

        // Find the author to check if they exist
        const author = await User.findOne({ _id: authorId });
        if (!author) {
            return res.status(404).json({ error: 'Author not found' });
        }

        // Find books by the author
        const books = await Book.find({ author: authorId }).populate('author', 'name');

        res.status(200).json({
            sucess: true,
            message: "All Books Fetched",
            books,
        });

    } catch (error) {
        console.error('Error fetching books by author:', error);
        res.status(500).json({
            error: 'An error occurred while fetching books'
        });
    }
}

exports.getBooksByGenre = async (req, res) => {

    try {

        const { genre } = req.query;

        // Find books by genre
        const books = await Book.find({ genre });

        if (books.length === 0) {
            return res.status(404).json({ message: 'No books found for this genre' });
        }

        res.status(200).json({
            success: true,
            message: "All books fetched",
            books
        });

    } catch (error) {
        console.error('Error fetching books by genre:', error);
        res.status(500).json({ error: 'An error occurred while fetching books' });
    }
}

exports.getBooksByTitle = async (req, res) => {

    try {

        const { title } = req.query;

        if (!title) {
            return res.status(400).json({
                success: false,
                message: 'Title query parameter is required'
            });
        }

        // Use a case-insensitive regex search to match titles
        const books = await Book.find({ title: new RegExp(title, 'i') });

        if (books.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'No books found matching the title'
            });
        }

        res.status(200).json({
            success: true,
            message: "All books fetched",
            books
        });

    } catch (error) {
        console.error('Error searching books by title:', error);
        res.status(500).json({ error: 'An error occurred while searching for books' });
    }
}

exports.getFilterBooks = async (req, res) => {

    try {

        const { page = 1, limit = 10,
            minPrice, maxPrice, tags, minRating,
            sort,
        } = req.body;

        const pageNumber = parseInt(page, 10);
        const limitNumber = parseInt(limit, 10);

        const filters = {};

        // Filter by price range
        if (minPrice || maxPrice) {
            filters.price = {};
            if (minPrice) filters.price.$gte = parseFloat(minPrice);
            if (maxPrice) filters.price.$lte = parseFloat(maxPrice);
        }

        // Filter by tags (multi-select)
        if (tags) {
            filters.tags = { $in: tags.split(',') };
        }

        // Filter by minimum rating
        if (minRating) {
            const bookIdsWithMinRating = await Rating.aggregate([
                { $group: { _id: '$book', avgRating: { $avg: '$rating' } } },
                { $match: { avgRating: { $gte: parseFloat(minRating) } } },
                { $project: { _id: 1 } },
            ]).exec();

            const bookIds = bookIdsWithMinRating.map(r => r._id);
            filters._id = { $in: bookIds };
        }

        // Sorting
        let sortOption = {};
        if (sort === 'priceAsc') sortOption.price = 1;
        else if (sort === 'priceDesc') sortOption.price = -1;
        else if (sort === 'publishDateAsc') sortOption.publishDate = 1;
        else if (sort === 'publishDateDesc') sortOption.publishDate = -1;
        else if (sort === 'ratingAsc') sortOption['ratingAndReview.rating'] = 1;
        else if (sort === 'ratingDesc') sortOption['ratingAndReview.rating'] = -1;

        // Pagination
        const books = await Book.find(filters)
            .populate('author', 'firstName lastName') // Populate author details
            .populate({
                path: 'ratingAndReview',
                populate: { path: 'user', select: 'firstName lastName' } // Populate user details in ratings
            })
            .sort(sortOption)
            .skip((pageNumber - 1) * limitNumber)
            .limit(limitNumber)
            .exec();

        const totalBooks = await Book.countDocuments(filters);

        res.status(200).json({
            books,
            totalBooks,
            totalPages: Math.ceil(totalBooks / limitNumber),
            currentPage: pageNumber
        });

    } catch (error) {
        console.error('Error getting books:', error);
        res.status(500).json({ error: 'An error occurred while retrieving books' });
    }

}

exports.getBookDetails = async (req, res) => {

    try {

        const { bookId } = req.query;

        if (!bookId) {

            return res.status(401).json({
                success: false,
                message: "BookId is Required",
            })
        }

        const book = await Book.findById(bookId)
            .populate('author', 'firstName lastName') // Populate author details
            .populate({
                path: 'ratingAndReview',
                populate: { path: 'user', select: 'firstName lastName' } // Populate user details in ratings
            })
            .populate({
                path: "chapters",
                populate: "chapterName content"
            })
            .exec();

        return res.status(200).json({
            success: true,
            message: "Book details fetched",
            book,
        });


    } catch (error) {

        console.error('Error fetching book details:', error);
        res.status(500).json({
            success: false,
            error: 'An error occurred while fetching book details'
        });

    }
}

exports.getAllBooks = async(req, res) => {

    try {

        const books = await Book.find({})
        .populate({
            path : "ratingAndReview",
            select : "rating"
        })
        .populate({
            path : "author",
            select : "firstName lastName",
        }).exec();

        return res.status(200).json({
            success : true,
            message : "All Books Fetched",
            books,
        });

    } catch(error) {

        console.error('Error fetching Available books:', error);
        res.status(500).json({
            success: false,
            error: 'An error occurred while fetching available books '
        });

    }
}

exports.searchBooks = async (req, res) => {

    try {
      const { author, title, genre, sortBy, order = 'asc', page = 1, limit = 10 } = req.query;
  
      // Building the query object
      const query = {};
  
      if (author) {
        // Assuming author is the author's name
        query.author = new RegExp(author, 'i'); // case-insensitive match
      }
  
      if (title) {
        query.title = new RegExp(title, 'i'); // case-insensitive match
      }
  
      if (genre) {
        query.genre = genre;
      }
  
      // Pagination and Sorting
      const options = {
        page: parseInt(page, 10) || 1,
        limit: parseInt(limit, 10) || 10,
        sort: { [sortBy]: order === 'desc' ? -1 : 1 },
      };
  
      const books = await Book.paginate(query, options);
  
      res.status(200).json(
        {   success : true,
            message : "Fetched Books",
            books
        });

    } catch (error) {
      res.status(500).json({ error: 'Server Error' });
    }
  };