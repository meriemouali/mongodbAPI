
const express = require ("express")
const morgan = require ('morgan')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
mongoose.Promise = global.Promise




const app = express ();
const bookroutes = require("./routes/book")
const authorroutes = require("./routes/author")
const userroutes = require ("./routes/user")


mongoose.connect('mongodb://localhost/books',{ useNewUrlParser: true })
// POUR VERFIER QUE LA CONNECTION EST FAITE
mongoose.connection.once('open',function(){
    console.log("connection has been made")
    

}).on('error',function(error){
    console.log("connection",error)
})

app.use('/uploads',express.static('uploads'))
app.use(morgan('dev'))

app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())
app.use('/books',bookroutes)
app.use('/authors',authorroutes)
app.use('/users',userroutes)
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    if (req.method === "OPTIONS") {
      res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
      return res.status(200).json({});
    }
    next();
  });


  app.use((req, res, next) => {
    const error = new Error("Not found");
    error.status = 404;
    next(error);
  });
  
  app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
      error: {
        message: error.message
      }
    });
  });
  

module.exports = app;
