
const express = require ("express")
const morgan = require ('morgan')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')




const app = express ();
const bookroutes = require("./routes/book")


mongoose.connect('mongodb://localhost/books',{ useNewUrlParser: true })
// POUR VERFIER QUE LA CONNECTION EST FAITE
mongoose.connection.once('open',function(){
    console.log("connection has been made")
    

}).on('error',function(error){
    console.log("connection",error)
})


app.use(morgan('dev'))

app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())
app.use('/books',bookroutes)


app.use((req,res,next)=>{
    const error = new Error ('NOT FOUND');
    error.status = 404
    next(error)
})

app.use((error,req,res,next)=>{
    error.status(error.status || 500)
    res.json({
        error:{
            message:error.message
        }
    })
})

module.exports = app;
