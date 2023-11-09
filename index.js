require("dotenv").config();

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const accountRoutes = require("./routes/account.routes");

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

//connect database
mongoose.connect(process.env.MONGO_URL)
    .then(() => {
        // listen for requests
        app.listen(process.env.PORT, () => {
        console.log("connected to db & listening on port", process.env.PORT);
        });
    })
    .catch((error) => {
        console.log(error);
    });
