const express = require('express');
const router = express.Router();
const {list, store, update, remove, detail, addCollaborator, removeCollaborator} = require('../controllers/projectsController')

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
    .post('/collaborator/add', addCollaborator)
    .delete('/collaborator/remove', removeCollaborator)

    

module.exports = router;