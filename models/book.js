const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create a Schema and a Model

const BookSchema = new Schema({
    _id:mongoose.Types.ObjectId,
    title: String,
    
});

/*const AuthorSchema = new Schema({
    name: String,
    books: [BookSchema]
});*/

const book = mongoose.model('book', BookSchema);

module.exports = book;