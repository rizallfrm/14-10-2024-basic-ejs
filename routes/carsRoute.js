const express = require("express");
const router = express.Router();
const carController = require("../controller/carController");
const upload = require("../midleware/upload");

// Cars API
router.post("/", upload.array("images", 10), carController.createCar);
router.get("/", carController.getAllCars);
router.get("/:id", carController.getCarById);
router.delete("/:id", carController.deleteCarById);
router.patch("/:id", carController.updateCar);

module.exports = router;
