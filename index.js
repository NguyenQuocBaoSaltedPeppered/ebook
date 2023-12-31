require("dotenv").config();

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const accountRoutes = require("./routes/account.routes");
const novelRoutes = require("./routes/novel.routes");
const chapterRoutes = require("./routes/chapter.routes");
const bookmarkRoutes = require("./routes/bookmark.routes");
const reviewRoutes = require("./routes/review.routes");
const commentRoutes = require("./routes/comment.routes");
const historyRoutes = require("./routes/history.routes");
const rankingRoutes = require("./routes/ranking.routes");

//express app
const app = express();

app.use(cors());
app.use(express.json());
app.use((req, res, next) => {
    console.log(req.path, res.method);
    next();
});

//middleware
app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

//routes
app.use("/api/accounts", accountRoutes);
app.use("/api/novels", novelRoutes);
app.use("/api/chapters", chapterRoutes);
app.use("/api/bookmarks", bookmarkRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/comments", commentRoutes);
app.use("/api/history", historyRoutes);
app.use("/api/ranking", rankingRoutes);
app.get("/", (req, res) =>
    res.send("Hello, this is ebook app!")
);
//connect database
mongoose.connect('mongodb+srv://ebookDatabaseTest:jeqATdjuTKMI3Yal@ebook.nw4b7n3.mongodb.net/')
    .then(() => {
        // listen for requests
        app.listen('4096', () => {
        console.log("connected to db & listening on port", '4096');
        });
    })
    .catch((error) => {
        console.log(error);
    });
