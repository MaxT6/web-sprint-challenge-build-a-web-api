// add middlewares here related to projects
const Projects = require('./projects-model')

async function validateProjectId(req, res, next) {
  try {
    const project = await Projects.get(req.params.id)
    if (!project) {
      res.status(404).json({message: "project not found"})
    } else {
      req.project = project
      next ()
    }
  } catch (error) {
    res.status(500).json({
      message: "problem finding project"
    })
  }
}


function validateProject(req, res, next) {
  const { name, description, completed} = req.body
  if (!name || !name.trim()) {
    res.status(400).json({ message: "missing required name field"})
  } else if (!description || !description.trim()) {
    res.status(400).json({ message: "missign required description field"})
  } else if (completed !== true && completed !== false) {
      res.status(400).json({ message: "completed status must be set to true or false"})
  } else {
    req.name = name.trim()
    req.description = description.trim()
    next()
  }
}


module.exports = {
  validateProject,
  validateProjectId,
}