const express = require('express');
const mongoose = require('mongoose')
const router = express.Router();
const Author = require("../models/author")
const Book = require ('../models/book')


router.get('/',(req,res,next)=>{
    
    Author.find()
    .select('name _id book')
    .exec()
    .then(docs=>{
        const response ={
            count : docs.length,
            authors:docs.map(doc=>{return{name:doc.name,_id:doc._id,book:doc.book,request:{type:'GET',url:'http://localhost:3000/authors/'+doc._id}}})
        }
    res.status(200).json(response)})
    .catch(err=>{console.log(err)
    res.status(500).json({error:err})})
})


router.post("/", (req, res, next) => {
    //VERIFY BOOK EXIST//
    Book.findById(req.body.bookId).then(book=>{
        if(!book){
            return res.status(404).json({
                message:"book not found"
            })
        }
        const author = new Author({
            _id : new mongoose.Types.ObjectId(),
            name : req.body.name,
            book :req.body.bookId
    
            
        });
        return author.save()
        .then(
            result => {
                console.log(result);
                res.status(201).json({
                  message: "created author succesufully",
                  createdauthor:{
                      name :result.name,
                      book :result.book,
                      _id:result._id,
                      request:{
                          type:'POST',
                          url:"http://localhost:3000/authors/"+result._id
                      }
                  }
                });
                console.log(result)
              }
        )
    }).catch(err=>{res.status(500).json({message:'book not found',error:err})})
     
  });


router.get('/:authorId',(req,res,next)=>{

    const id = req.params.authorId;
    Author.findById(id)
    .select("name _id book")
    .exec().then(doc=>{
        if(!doc){
            return res.status(404).json({message:"author not found"});
        }
        res.status(200).json({
            author : doc,
            request:{
                type:'GET',
                description:'get author by id',
                url:"http://localhost/authors"+doc._id
            }
           
        })
        console.log(doc)
    }).catch(err=>{
        res.status(500).json({error:err})
        console.log(err)
    }
      )
   
    
    
})


router.delete("/:authorId",(req,res,next)=>{
    const id =req.params.authorId;
    Author.remove({_id:id})
    .exec()
    .then(result=>{res.status(200).json({
        message:'author deleted',
        request :{
            url:"http://localhost:3000/authors"
        }
    })})
    .catch(err=>{console.log(err)
    res.status(500).json({error:err})})
})

router.patch("/:authorId",(req,res,next)=>{
    const id = req.params.authorId
    const updateOps={};
    for(const ops of req.body){
        updateOps[ops.propName] = ops.value
    }
    Author.update({_id:id},{$set : updateOps})
    .exec()
    .then(result=>{console.log(result);
    res.status(200).json({message:'author updated',request:{
        type:'GET',url:"http://localhost:3000/authors/"+id
    }})})
    .catch(err=>{console.log(err);
    res.status(500).json({error: err})});
})
module.exports = router ;