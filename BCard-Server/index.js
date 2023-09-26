const express = require("express");
const mongoose = require("mongoose");
const cards = require("./routes/cards");
const users = require("./routes/users");
const favCards = require("./routes/favCards");
const logger = require("morgan");
const chalk = require("chalk");
const path = require('path');
const rfs = require('rotating-file-stream')
const cors = require("cors");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 9600

mongoose
    .connect(process.env.DB, { useNewUrlParser: true })
    .then(() => console.log(chalk.bgGreenBright("MongoDB connected successfully!")))
    .catch((error) => console.log(chalk.red(error)));

const accessLogStream = rfs.createStream('errors.log', {
    interval: '1d',
    path: path.join(__dirname, 'logs')
})

app.use(logger("common"));
app.use(logger("common", { stream: accessLogStream, skip: function (req, res) { return res.statusCode < 400 } }));
app.use(express.json());
app.use(cors());

app.use(express.json())
app.use(cors())

app.use("/api/cards", cards)
app.use("/api/favCards", favCards)
app.use("/api/users", users)


app.get("*", (req, res) => {
    res.send("No existing route...")
})


app.listen(port, () => console.log(chalk.bgGreenBright("Server started on port", port)))