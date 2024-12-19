const express = require("express");
const { getStudentProfile, editStudentProfile } = require("../controllers/studentController");
const router = express.Router();

router.get("/:id/profile",getStudentProfile);
router.put("/:id/profile", editStudentProfile);
module.exports = router;