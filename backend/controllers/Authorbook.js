const Book = require("../models/Book");
const User = require("../models/user");
const Chapter = require("../models/Chapter");
const { uploadImageToCloudinary } = require("../utils/imageUploader");
const Rating = require("../models/RatingAndReview");

exports.createBook = async (req, res) => {

    try {

        let {
            title,
            description,
            genre,
            price,
            tags,
            Status,
        } = req.body;

        const authorID = req.user.id;

        const coverImage = req.files.image;

        if (!title | !description | !genre | !price | !tags |
            !coverImage | !authorID) {

            return res.status(401).json({
                success: false,
                message: "All Fields Are Required",
            })
        }

        // Find the author by email (or any unique identifier)
        const existingAuthor = await User.findOne({ _id: authorID });

        if (!existingAuthor) {
            return res.status(404).json({ message: 'Author not found' });
        }

        if (!Status || Status === undefined) {
            Status = "Draft";
        }

        const uploadedImage = await uploadImageToCloudinary(coverImage, process.env.FOLDER_NAME)

        // Create new Book instance
        const newBook = new Book({
            title,
            description,
            genre,
            cover: uploadedImage.secure_url,
            author: existingAuthor._id,
            Status,
            price,
            tags,
        })

        await newBook.save();
        existingAuthor.books.push(newBook._id);
        await existingAuthor.save();

        res.status(200).json({
            success: true,
            message: "New Book Created",
            newBook
        });

    } catch (error) {
        console.error('Error adding book:', error);
        res.status(400).json({
            success: false,
            message: 'Error adding book',
            error
        });
    }
}

exports.createChapter = async (req, res) => {

    try {

        const authorId = req.user.id;

        const { chapterName, content, bookId } = req.body;

        if (!chapterName || !content || !bookId) {

            return res.status(401).json({
                success: false,
                message: "All Fields Are Required",
            })
        }

        if (!authorId) {

            return res.status(401).json({
                success: false,
                message: "Author not found",
            })
        }

        // find book if its exists with provide id
        const book = await Book.findOne({ _id: bookId });

        if (!book) {

            return res.status(401).json({
                success: false,
                message: "Book Not Found",
            })
        }

        // create chapter for th book
        const newChapter = await Chapter.create({
            chapterName,
            content,
        });

        // update the book add new chapter to it
        const updatedBook = await Book.findByIdAndUpdate(
            { _id: bookId },
            {
                $push: { chapters: newChapter._id }
            },
            { new: true }
        );

        console.log(updatedBook);

        return res.status(200).json({
            success: true,
            message: "Chapter Created Successfuly",
        });


    } catch (error) {
        console.error('Error adding Chapter :', error);
        res.status(500).json({
            success: false,
            message: 'Error adding Chapter',
            error
        });
    }
}

exports.setStatus = async (req, res) => {

    try {

        const { Status, bookId } = req.body;

        const authorId = req.user.id;

        if (!Status | !authorId | !bookId) {

            return res.status(401).json({
                success: false,
                message: "All Fields Are Required",
            })
        }

        // find book
        const book = await Book.findOne({ _id: bookId });

        if (!book) {

            return res.status(401).json({
                success: false,
                message: "Book Not Found",
            })
        }

        const updatedBook = await Book.findByIdAndUpdate(
            { _id: bookId },
            {
                Status: Status,
                publishDate: new Date(),
            }
        );

        return res.status(200).json({
            success: true,
            message: "Status Updated",
            updatedBook,
        });

    } catch (error) {
        console.error('Error Updating Status :', error);
        res.status(500).json({
            success: false,
            message: 'Error Updating Status',
            error
        });
    }
}

exports.updateBook = async (req, res) => {

    try {

        const { bookId } = req.body
        const updates = req.body
        const book = await Book.findById({ _id: bookId })

        if (!book) {
            return res.status(404).json({
                error: "Book not found"
            })
        }

        // If Thumbnail Image is found, update it
        if (req.files) {
            console.log("thumbnail update")
            const coverImage = req.files.image
            const uploadedImage = await uploadImageToCloudinary(
                coverImage,
                process.env.FOLDER_NAME
            )
            book.cover = uploadedImage.secure_url
        }

        // Update only the fields that are present in the request body
        for (const key in updates) {
            if (updates.hasOwnProperty(key)) {
                console.log("key->", key);
                if (key === "tags") {
                    book[key] = updates[key]
                } else {
                    book[key] = updates[key]
                }
            }
        }

        await book.save()

        const updatedBook = await Book.findById({
            _id: bookId,
        })
            .populate({
                path: "author"
            })
            .populate({
                path: "chapters",
            })
            .populate(
                {
                    path: "ratingAndReview",
                    populate: {
                        path: "user",
                    }
                })
            .exec()

        console.log("Updated Book->", updatedBook);

        res.json({
            success: true,
            message: "Book updated successfully",
            data: updatedBook,
        })
    } catch (error) {
        console.error(error)
        res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message,
        })
    }
}

exports.updateChapter = async (req, res) => {

    try {

        const { chapterId } = req.body;
        const updates = req.body;

        if (!chapterId) {

            return res.status(401).json({
                success: false,
                message: "Chapter Id is Required",
            })
        }

        const chapter = await Chapter.findOne({ _id: chapterId });

        if (!chapter) {

            return res.status(401).json({
                success: false,
                message: "chapter not found",
            });
        }

        // Update only the fields that are present in the request body
        for (const key in updates) {
            if (updates.hasOwnProperty(key)) {
                console.log("key->", key);
                chapter[key] = updates[key];
            }
        }

        await chapter.save();

        return res.status(200).json({
            success: true,
            message: "Chapter updated Successfuly",
            chapter,
        });

    } catch (error) {
        console.error(error)
        res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message,
        })
    }
}

exports.searchBook = async (req, res) => {

    try {
        const { title } = req.query;
        const authorId = req.user.id;
        console.log(title);

        if (!title) {
            return res.status(400).json({
                success: false,
                error: 'Title query parameter is required'
            });
        }

        const books = await Book.find({
            author: authorId,
            title: { $regex: title, $options: 'i' },
        });

        res.status(200).json({
            success: true,
            books
        });

    } catch (error) {
        console.error('Error searching for books:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

exports.filterByStatusAndGenre = async (req, res) => {

    try {
        const { Status, genre } = req.query;
        const authorId = req.user.id;

        let filter = {
            author: authorId
        };

        if (Status) {
            filter.Status = Status;
        }

        if (genre) {
            filter.genre = genre;
        }
        // console.log(filter);
        const books = await Book.find(filter);

        res.status(200).json({
            success: true,
            books
        });

    } catch (error) {
        console.error('Error searching for books based on Status:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

exports.sortAccordingToPublishDateAndRating = async (req, res) => {

    try {

        const { sortBy, sortOrder } = req.query;
        const authorId = req.user.id;

        let sort = {};
        if (sortBy === 'publishDate') {
            sort.publishDate = sortOrder === 'desc' ? -1 : 1;
        }

        const books = await Book.find({ author: authorId }).sort(sort)
            .populate("ratingAndReview").exec()


        if (sortBy === 'ratings') {
            books.sort((a, b) => {
                const aRating = a.ratingAndReview.reduce((acc, rating) => acc + rating.value, 0) / a.ratingAndReview.length || 0;
                const bRating = b.ratingAndReview.reduce((acc, rating) => acc + rating.value, 0) / b.ratingAndReview.length || 0;
                return sortOrder === 'desc' ? bRating - aRating : aRating - bRating;
            });
        }

        res.status(200).json({
            message: true,
            books
        });

    } catch (error) {
        console.error('Error sorting books:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error',
        });
    }
}

exports.getAllRating = async (req, res) => {

    try {

        const userId = req.user.id;

        if (!userId) {

            return res.status(401).json({
                success: false,
                message: "User iD required",
            })
        }

        const books = await Book.find({ author: userId })

        // Extract book IDs
        const bookIds = books.map(book => book._id);

        // Find all reviews for the books authored by the user
        const reviews = await Rating.find({ book: { $in: bookIds } })
        .sort({createdAt : -1})
        .populate('book')
            .populate({
                path: "user",
                select: "firstName lastName"
            });

        return res.status(200).json({
            success: true,
            message: "All Rating And Reviews Fetched",
            reviews,
        })

    } catch (error) {
        console.error('Error while fetching Rating :', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error',
        });
    }
}

exports.listAllBooksViaPagination = async (req, res) => {

    try {
        const authorId = req.user.id;
        const { page, limit } = req.body;

        const options = {
            page: parseInt(page),
            limit: parseInt(limit),
            populate: 'author',
            sort: { publishDate: -1 } // Adjust the sort order as needed
        };

        const books = await Book.paginate({ author: authorId }, options);

        res.status(200).json({
            success: true,
            message: "Books fetched",
            books: books.docs,
            totalPages: books.totalPages,
            currentPage: books.page,
            hasNextPage: books.hasNextPage,
            hasPrevPage: books.hasPrevPage,
            nextPage: books.nextPage,
            prevPage: books.prevPage,
            totalDocs: books.totalDocs
        });

    } catch (error) {
        console.error('Error fetching books:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}