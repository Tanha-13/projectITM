const express = require('express');
const { addSupervisor, allSupervisors, updateSupervisor, deleteSupervisor, allStudents, getStudentsByStatus, updateStudentStatus, getStudentDetails, getAdminProfile, editAdminProfile, projectList, projectDetails, adminSemesterProjects } = require('../controllers/adminController');
const router = express.Router();

router.post('/add-supervisor',addSupervisor);
router.get("/supervisors",allSupervisors);
router.put('/supervisor/:id',updateSupervisor);
router.delete('/supervisor/:id',deleteSupervisor);
//student
router.post('/add-student',getStudentDetails);
// student page of admin
router.get('/all-students',allStudents);
//review student
router.get('/students', getStudentsByStatus);
router.put('/student/:id', updateStudentStatus);

//project routes
router.get('/:id/semester-projects', adminSemesterProjects);
router.get('/:id/projects/:semester/:projectId', projectDetails);


//profile
router.get("/:id/profile",getAdminProfile);
router.put("/:id/profile",editAdminProfile);

module.exports = router;