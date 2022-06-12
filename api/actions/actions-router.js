// Write your "actions" router here!
const express = require('express');
const Actions = require('./actions-model');
const router = express.Router();
const { validateAction, validateActionId } = require('./actions-middlware')


router.get('/', (req, res, next) => {
  Actions.get()
  .then(actions => {
    res.json(actions)
  })
  .catch(next)
})

router.get('/:id', validateActionId, (req, res, next) => {
  res.json(req.action)
});

router.delete('/:id', validateActionId, async (req, res, next) => {
  try {
    const result = await Actions.remove(req.params.id)
    res.json(req.action)
  } catch(err) {
    next(err)
  }
});

router.post('/', validateAction, (req, res, next) => {
  Actions.insert(req.body)
  .then(newAction => {
    res.status(201).json(newAction)
  })
  .catch(next)
})


module.exports = router
