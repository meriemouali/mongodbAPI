const Book = require ('../models/book')
const mongoose = require('mongoose')

exports.books_get_all = (req,res,next)=>{
    
    Book.find()
    .select('title _id bookImage')
    .exec()
    .then(docs=>{
        const response ={
            count : docs.length,
            books:docs.map(doc=>{return{
                title:doc.title,_id:doc._id,bookImage:doc.bookImage,request:{type:'GET',url:'http://localhost:3000/books/'+doc._id}}})
        }
    res.status(200).json(response)})
    .catch(err=>{console.log(err)
    res.status(500).json({error:err})})
}

exports.books_create = (req, res, next) => {
    console.log(req.file)
    const book = new Book({
        _id : new mongoose.Types.ObjectId(),
        title : req.body.title,
        bookImage:req.file.path
        
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

     
  }




  exports.get_book_byid = (req,res,next)=>{

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
   
    
    
}





exports.book_delete =(req,res,next)=>{
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
}





exports.book_update= (req,res,next)=>{
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
}