const express = require('express');
const router = express.Router();
const puzzleController = require('../controller/puzzle.controller')
const upload = require('../middleware/multer');
const { isAuthenticated } = require('../middleware/isAuth');
/* GET home page. */

router.route('/')
.post(isAuthenticated, upload.single('image'), puzzleController.add)
.get(isAuthenticated, puzzleController.show)
.patch(isAuthenticated, upload.single('image'), puzzleController.update)
.delete(isAuthenticated, puzzleController.delete)

module.exports = router;
