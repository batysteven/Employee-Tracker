const router = require('express').Router();
const departmentRoutes = require('./departmentRoutes');
const employeeRoutes = require('./employeeRoutes');
const roleRoutes = require('./roleRoutes');

router.use(departmentRoutes);
router.use(employeeRoutes);
router.use(roleRoutes);

module.exports = router;