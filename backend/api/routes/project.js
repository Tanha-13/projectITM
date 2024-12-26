const express = require("express");
const router = express.Router();

const { getProject } = require("../controllers/projectController");

router.get('/:id', getProject);
// router.put('/:id', updateProject);
// router.delete('/:id', deleteProject);
// router.get('/', getAllProjects);

module.exports = router;