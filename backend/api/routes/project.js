const express = require("express");
const router = express.Router();
const upload = require('../config/multerConfig');

const { getProject,updateProject } = require("../controllers/projectController");

router.get('/:id', getProject);
router.put('/:id', upload.fields([
    { name: 'useCaseDiagram', maxCount: 1 },
    { name: 'entityRelationDiagram', maxCount: 1 },
    { name: 'documentation', maxCount: 1 }
  ]), updateProject);
// router.delete('/:id', deleteProject);
// router.get('/', getAllProjects);

module.exports = router;