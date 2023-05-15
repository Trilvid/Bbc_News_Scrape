const express = require('express');
const dataController = require('./../controller/dataController')

let router = express.Router();

router.get('/', dataController.getNewsData)
router.get('/:id', dataController.getNews)
router.post('/post', dataController.postNews)

export const route = router
  