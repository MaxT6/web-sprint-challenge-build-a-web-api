// Write your "projects" router here!
const express = require('express');
const Projects = require('./projects-model')
const router = express.Router()
const { validateProjectId, validateProject } = require('./projects-middleware')


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

router.get('/:id', validateProjectId, (req, res, next) => {
  res.json(req.project)
});

router.delete('/:id', validateProjectId, async (req, res, next) => {
  try {
    const result = await Projects.remove(req.params.id)
    res.json(req.user)
  } catch(err) {
    next(err)
  }
});

router.post('/', validateProject, (req, res, next) => {
  Projects.insert(req.body)
  .then(newProject => {
    res.status(201).json(newProject)
  })
  .catch(next)
})

router.put('/:id', validateProjectId, validateProject, (req, res, next) => {
  Projects.update(req.params.id, req.body) //pending
  .then(updatedProject => {
    res.status(200).json({
      name: updatedProject.name,
      description: updatedProject.description,
      completed: updatedProject.completed
    })
  })
  // .then(updatedProject => {
  //   res.json(updatedProject)
  // })
  .catch(next)
})


router.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    customMessage: "There was an error",
    message: err.message
  })
});

module.exports = router