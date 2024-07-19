const express = require("express");
require("dotenv").config();
const { dbConnect } = require("./config/db");
const {cloudinaryConnect} = require("./config/cloudinary");
const cors = require("cors");

const PORT = process.env.PORT;
const app = express();


// importing routes
const authRoutes = require("./routes/authRoutes");
const booksRoutes = require("./routes/bookRoutes");
const ratingAndReview = require("./routes/ratingAndReview");

//import middlewares
const cookieParser = require("cookie-parser");
const fileUpload = require("express-fileupload")

// // middlewares
app.use(express.json());
app.use(cookieParser());
app.use(
    cors ({
            origin : "*",
            credentials : true,
    })
);

app.use(
    fileUpload({
        
        useTempFiles : true,
        tempFileDir : "tmp",

    })
)

// mounting routes 
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/book", booksRoutes);
app.use("/api/v1/feedback", ratingAndReview);

dbConnect();
cloudinaryConnect();

app.get("/", (req, res) => {

    res.send("Welcome to BooksMart");

});

app.listen(PORT , () => {

    console.log(`Server is up and running at PORT ${PORT}`);

})