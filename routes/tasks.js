const express = require('express');
const router = express.Router();
const {list, store, update, remove, detail, changeState} = require('../controllers/tasksController')

router
  .route('/')
    .get(list)
    .post(store)

router
    .route('/:id')
      .get(detail)
      .put(update)
      .delete(remove)

router
    .post('/changeState/:id', changeState)

    

module.exports = router;