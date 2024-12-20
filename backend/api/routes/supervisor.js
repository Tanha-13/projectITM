const express = require("express");
const { getSupervisorProfile, editSupervisorProfile, getStudents, getProjectDetails } = require("../controllers/supervisorController");
const router = express.Router();

router.get("/:id/profile", getSupervisorProfile);
router.put("/:id/profile", editSupervisorProfile);

//getting students
router.get("/:id/students",getStudents);

// getting project details
router.post("/:id/create-project",getProjectDetails);
module.exports = router;