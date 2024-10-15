const express = require("express");
const router = express.Router();
const dashboardControllers = require("../controller/dashboardControllers");
const upload = require("../midleware/upload");

router.get("/users", dashboardControllers.usersPage);
router.get("/users/create", dashboardControllers.createPage);
router.post("/users/create", dashboardControllers.createUser);

//view engine = tidak ada put/patch/delete
module.exports = router;
