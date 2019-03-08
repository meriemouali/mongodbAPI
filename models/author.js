
const mongoose = require('mongoose');

const authorSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: {type:String, required:true},
    book: {type:mongoose.Schema.Types.ObjectId, ref: 'Book' ,required:true}
    
});

module.exports = mongoose.model('Author', authorSchema);