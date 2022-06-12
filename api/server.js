const express = require('express');
const projectsRouter = require('./projects/projects-router.js');
const actionsRouter = require('./actions/actions-router.js');
const server = express();


server.use(express.json())


server.use('/api/projects', projectsRouter)

server.use('/api/actions', actionsRouter)

server.get('/api/projects', (req, res) => {
  res.send(`
  <h2>Projects API </h2>
  `)
});

server.use('*', (req, res) => {
  res.status(404).json({ message: `${req.method} ${req.baseUrl} not found!`})
});

// server.get('/', (req, res) => {
//   res.send(`<h>${process.env.MESSAGE}</h1>`)
// });

// server.get('/api/projects', (req, res) => {
//   res.send(`<h>${process.env.MESSAGE}</h1>`)
// });


// Configure your server here

// Build your actions router in /api/actions/actions-router.js
// Build your projects router in /api/projects/projects-router.js


// Do NOT `server.listen()` inside this file!

module.exports = server;
