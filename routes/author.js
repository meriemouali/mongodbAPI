const express = require('express');

const router = express.Router();

const controllersauthor = require('../controllers/author')

router.get('/',controllersauthor.get_all_author)


router.post("/",controllersauthor.create_author);


router.get('/:authorId',controllersauthor.get_author_byid)


router.delete("/:authorId",controllersauthor.delete_author)

router.patch("/:authorId",controllersauthor.update_author)
module.exports = router ;