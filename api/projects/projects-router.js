// Write your "projects" router here!
const express = require('express');
const Projects = require('./projects-model')
const router = express.Router()


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
 
})

router.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    customMessage: "There was an error",
    message: err.message
  })
})

module.exports = router