
const express = require('express');
const mongoose = require('mongoose')
const router = express.Router();
const Book = require("../models/book")


router.get('/',(req,res,next)=>{
    
    Book.find()
    .select('title _id')
    .exec()
    .then(docs=>{
        const response ={
            count : docs.length,
            books:docs.map(doc=>{return{title:doc.title,_id:doc._id,request:{type:'GET',url:'http://localhost:3000/books/'+doc._id}}})
        }
    res.status(200).json(response)})
    .catch(err=>{console.log(err)
    res.status(500).json({error:err})})
})

/*router.post('/',(req,res,next)=>{
    const book = new book({
        _id : new mongoose.Types.ObjectId(),
        title : req.body.title
    })
        book.save().then(result=>{
            console.log("book saved",result)
            res.status(201).json({
                message:"handle post",
                createdbook:result
            })
        }).catch(error=>{
            console.log("error while saving",error)
            res.status(500).json({error:err})
        }
        
        )
    
    res.status(200).json({
        message:"HANDLING post REQUEST FOR /books",
        createdbook : book
    })
})*/
router.post("/", (req, res, next) => {
    const book = new Book({
        _id : new mongoose.Types.ObjectId(),
        title : req.body.title
        
    });
    book.save().then(result => {
        console.log(result);
        res.status(201).json({
          message: "created book succesufully",
          createdbook:{
              title :result.title,
              _id:result._id,
              request:{
                  type:'POST',
                  url:"http://localhost:3000/books/"+result._id
              }
          }
        });
        console.log(result)
      })
      .catch(err => { console.log("erreur de post :",err);
      res.status(505).json({
          error:err
       
      });}
       
      );
      /*res.status(201).json({
          message:"handle post request",
          createdbook : book
      })*/
     
  });


router.get('/:bookId',(req,res,next)=>{

    const id = req.params.bookId;
    Book.findById(id)
    .select("title _id")
    .exec().then(doc=>{
        res.status(200).json({
            book : doc,
            request:{
                type:'GET',
                description:'get book by id',
                url:"http://localhost/books"+doc._id
            }
           
        })
        console.log(doc)
    }).catch(err=>{
        res.status(500).json({error:err})
        console.log(err)
    }
      )
   
    
    
})


router.delete("/:bookId",(req,res,next)=>{
    const id =req.params.bookId;
    Book.remove({_id:id})
    .exec()
    .then(result=>{res.status(200).json({
        message:'book deleted',
        request :{
            url:"http://localhost:3000/books"
        }
    })})
    .catch(err=>{console.log(err)
    res.status(500).json({error:err})})
})

router.patch("/:bookId",(req,res,next)=>{
    const id = req.params.bookId
    const updateOps={};
    for(const ops of req.body){
        updateOps[ops.propName] = ops.value
    }
    Book.update({_id:id},{$set : updateOps})
    .exec()
    .then(result=>{console.log(result);
    res.status(200).json({message:'book updated',request:{
        type:'GET',url:"http://localhost:3000/books/"+id
    }})})
    .catch(err=>{console.log(err);
    res.status(500).json({error: err})});
})
module.exports = router ;