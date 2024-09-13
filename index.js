const express = require("express");
const userRoute = require("./routes/user");
const postRoute = require("./routes/post");
const commentRoute = require("./routes/comment");
const dotenv = require("dotenv");

const app = express();
dotenv.config();
const PORT = process.env.port || 2200;

app.use(express.json());
app.use(userRoute);
app.use(postRoute);
app.use(commentRoute);

// CREATING MONGODB DATABASE CONNECTION

const mongoose = require("mongoose");

mongoose.connect(process.env.MONGO_URL)
.then(() => console.log("mongodb connected"))
.catch(error => console.log(error.message));

app.listen(PORT, () => console.log(`connected to backend on port: ${PORT}`));