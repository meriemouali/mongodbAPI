
const express = require ("express")

const app = express ();
const bookroutes = require("./routes/book")

app.use('/books',bookroutes)

module.exports = app;
