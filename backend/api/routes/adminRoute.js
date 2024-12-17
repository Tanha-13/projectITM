const express = require('express');
const { addSupervisor, allSupervisors, updateSupervisor, deleteSupervisor } = require('../controllers/adminController');
const router = express.Router();

router.post('/add-supervisor',addSupervisor);
router.get("/supervisors",allSupervisors);
router.put('/supervisor/:id',updateSupervisor);
router.delete('/supervisor/:id',deleteSupervisor);

module.exports = router;