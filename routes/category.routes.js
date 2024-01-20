const express = require('express');
const router = express.Router();
const categoryController = require('../controller/category.controller')
const upload = require('../middleware/multer');
const { isAuthenticated } = require('../middleware/isAuth');
/* GET home page. */

router.route('/')
.post(isAuthenticated, upload.single('image'), categoryController.add)
.get(isAuthenticated, categoryController.show)
.patch(isAuthenticated, upload.single('image'), categoryController.update)
.delete(isAuthenticated, categoryController.delete)

module.exports = router;
