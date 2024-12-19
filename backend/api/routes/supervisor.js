const express = require("express");
const { getSupervisorProfile, editSupervisorProfile } = require("../controllers/supervisorController");
const router = express.Router();

router.get("/:id/profile", getSupervisorProfile);
router.put("/:id/profile", editSupervisorProfile);
module.exports = router;