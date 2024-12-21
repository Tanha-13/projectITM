const express = require("express");
const { getSupervisorProfile, editSupervisorProfile, getStudents, getProjectDetails, semesterProjects, updateProjects, deleteProjects, updateStatusProjects } = require("../controllers/supervisorController");
const router = express.Router();

router.get("/:id/profile", getSupervisorProfile);
router.put("/:id/profile", editSupervisorProfile);

//getting students
router.get("/:id/students",getStudents);

// getting project details
router.post("/:id/create-project",getProjectDetails);
router.get("/:id/semester-projects", semesterProjects);
router.put(":/id/projects/:projectId", updateProjects);
router.delete("/:id/projects/:projectId", deleteProjects);
router.patch("/:id/projects/:projectId", updateStatusProjects);
module.exports = router;