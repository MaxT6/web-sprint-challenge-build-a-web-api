// Write your "projects" router here!
const express = require('express');
const Projects = require('./projects-model')
const router = express.Router()
const Actions = require('../actions/actions-model')
const { validateProjectId, validateProject } = require('./projects-middleware')

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
    res.json(req.project)
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
  .catch(next)
})

router.get('/:id/actions', (req, res, next) => {
  Actions.get()
  .then(actions => {
    // console.log("req.body", req.body, "ID", req.params.id, "Proj ID", actions.project_id)
    let projArr = actions.filter(project => project.project_id == req.params.id) 
      res.json(projArr)
  })
  .catch(next)
})


router.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    customMessage: "There was an error",
    message: err.message
  })
});

module.exports = router