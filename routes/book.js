
const express = require('express');

const router = express.Router();

const multer = require ("multer")

const storage = multer.diskStorage({
    destination: function(req,file,cb){
        cb(null,'./uploads')
    },
    filename :function(req,file,cb){
        cb(null,new Date().toISOString()+ file.originalname)
    }
})
const fileFilter = (req,file,cb)=>{
    if(file.mimetype ==='image/jpeg' || file.mimetype ==='image/png')
{
    cb(null,true)
} else {
    cb(null,false)
}
}
const upload = multer({ storage:storage,limits:{fileSize:1024*1024*5},fileFilter:fileFilter})
const checkAuth = require('../middleware/check-auth');

const controllersbook = require ('../controllers/book')


router.get('/',controllersbook.books_get_all)


router.post("/",upload.single("bookImage"),checkAuth, controllersbook.books_create);


router.get('/:bookId',controllersbook.get_book_byid)


router.delete("/:bookId",controllersbook.book_delete)

router.patch("/:bookId",controllersbook.book_update)
module.exports = router ;