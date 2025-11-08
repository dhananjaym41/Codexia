const express = require('express');
const router = express.Router();
// Controller path fixed to match repository `Controller/` folder
const projectController = require('../Controller/projectController');

// CRUD Endpoints
router.post('/', projectController.createProject);
router.get('/', projectController.getProjects);
router.get('/:id', projectController.getProjectById);
router.delete('/:id', projectController.deleteProject);

module.exports = router;
