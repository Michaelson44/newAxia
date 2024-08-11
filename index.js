const express = require("express");
const getUsers = require("./routes/user");
const dotenv = require("dotenv");

const app = express();
dotenv.config();
const PORT = process.env.port || 2200;

app.use(express.json());
app.use(getUsers);

// CREATING MONGODB DATABASE CONNECTION

const mongoose = require("mongoose");

mongoose.connect(process.env.MONGO_URL)
.then(() => console.log("mongodb connected"))
.catch(error => console.log(error.message));

app.listen(PORT, () => console.log(`connected to backend on port: ${PORT}`));