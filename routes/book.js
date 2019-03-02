
const express = require('express');
const router = express.Router();


router.get('/',(req,res,next)=>{
    res.status(200).json({
        message:"HANDLING GET REQUEST FOR /books"
    })
})

router.post('/',(req,res,next)=>{
    res.status(200).json({
        message:"HANDLING post REQUEST FOR /books"
    })
})



router.get('/:bookId',(req,res,next)=>{

    const id = req.params.bookId;
    if(id === "special"){
        res.status(200).json({
            message:"you discoverd id",
            id:id
        })
    }
        else {
            res.status(200).json({
                message:"you pass an id",
                
            })

        }

    
    
})

module.exports = router ;