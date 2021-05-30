const express = require("express");
const router = express.Router();

router.use(require("./employeeRoutes"));
router.use(require("./roleRoutes"));
router.use(require("./departmentRoutes"));

module.exports = router;
