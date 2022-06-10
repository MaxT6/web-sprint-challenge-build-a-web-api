// Write your "projects" router here!
const express = require('express');
const Projects = require('./projects-model')
const router = express.Router()
const { validateUserId } = require('./projects-middleware')


// router.get('/api/projects', (req, res, next) => {
//   Projects.find()
//   .then(projects => {
//     res.json(projects)
//   })
//   .catch(next)
// })

router.get('/', (req, res, next) => {
  Projects.get()
  .then(projects => {
    res.json(projects)
  })
  .catch(next)
});

router.get('/:id', validateUserId, (req, res, next) => {
  res.json(req.project)
});

router.delete('/:id', validateUserId, async (req, res, next) => {
  try {
    const result = await Projects.remove(req.params.id)
    res.json(req.user)
  } catch(err) {
    next(err)
  }
});


router.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    customMessage: "There was an error",
    message: err.message
  })
});

module.exports = router