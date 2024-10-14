const imagekit = require("../lib/imagekit");
const { Car } = require("../models");
const fs = require('fs');


async function getAllCars(req, res) {
  try {
    // console.log("proses kapan ada yang request")
    // console.log(req.requestTime);
    // console.log("proses siapa yang request")
    // console.log(req.username);
    // console.log("proses API apa yang diminta")
    // console.log(req.originalUrl);

    const cars = await Car.findAll();

    res.status(200).json({
      status: "200",
      message: "Success get cars data",
      isSuccess: true,
      data: { cars },
    });
  } catch (error) {
    res.status(500).json({
      status: "500",
      message: "Failed to get cars data",
      isSuccess: false,
      error: error.message,
    });
  }
}

async function getCarById(req, res) {
  const id = req.params.id;
  try {
    const car = await Car.findByPk(id);

    if (!car) {
      return res.status(404).json({
        status: "404",
        message: "Car Not Found!",
      });
    }

    res.status(200).json({
      status: "200",
      message: "Success get cars data",
      isSuccess: true,
      data: { car },
    });
  } catch (error) {
    res.status(500).json({
      status: "500",
      message: "Failed to get cars data",
      isSuccess: false,
      error: error.message,
    });
  }
}

async function deleteCarById(req, res) {
  const id = req.params.id;
  try {
    const car = await Car.findByPk(id);

    if (car) {
      await car.destroy();

      res.status(200).json({
        status: "200",
        message: "Success get cars data",
        isSuccess: true,
        data: { car },
      });
    } else {
      res.status(404).json({
        status: "404",
        message: "Car Not Found!",
      });
    }
  } catch (error) {
    res.status(500).json({
      status: "500",
      message: "Failed to get cars data",
      isSuccess: false,
      error: error.message,
    });
  }
}

async function updateCar(req, res) {
  const id = req.params.id;
  const { plate, model, type, year } = req.body;

  try {
    const car = await Car.findByPk(id);

    if (car) {
      car.plate = plate;
      car.model = model;
      car.type = type;
      car.year = year;

      await car.save();

      res.status(200).json({
        status: "200",
        message: "Success get cars data",
        isSuccess: true,
        data: { car },
      });
    } else {
      res.status(404).json({
        status: "404",
        message: "Car Not Found!",
      });
    }
  } catch (error) {
    res.status(500).json({
      status: "500",
      message: "Failed to get cars data",
      isSuccess: false,
      error: error.message,
    });
  }
}

async function createCar(req, res) {
  const files = req.files;
  console.log("Files uploaded:", files);
  console.log("Request Body:", req.body);

  // Make sure there is a file uploaded
  if (!files || files.length === 0) {
    return res.status(400).json({
      status: "Failed",
      message: "No files uploaded.",
      isSuccess: false,
      data: null,
    });
  }

  let images = [];
  try {
    for (let i = 0; i < files.length; i++) {
      // Read file from path (because it uses diskStorage)
      const filePath = files[i].path;
      const uploadImage = await imagekit.upload({
        file: fs.readFileSync(filePath),
        fileName: files[i].originalname,
      });
      console.log(`Uploaded Image URL: ${uploadImage.url}`);
      images.push(uploadImage.url);
    }

    const newCar = { ...req.body, imagesCar: images };
    await Car.create(newCar); 
    res.status(200).json({
      status: "Success",
      message: "Car created successfully!",
      isSuccess: true,
      data: newCar,
    });
  } catch (error) {
    console.error("Error during createCar:", error.stack);
    res.status(500).json({
      status: "500",
      message: "Failed to create car",
      isSuccess: false,
      error: error.message,
    });
  }
}

module.exports = {
  createCar,
  getAllCars,
  getCarById,
  deleteCarById,
  updateCar,
};
