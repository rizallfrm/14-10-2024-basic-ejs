const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images");
  },
  filename: (req, file, cb) => {
    const timeStamp = Date.now();
    const originalName = file.originalname;
    const extension = path.extname(originalName);

    // create new file with format : timestamp-originalname
    const newFileName = `${timeStamp}-${originalName}`;

    cb(null, newFileName);
  },
});

const multerFiltering = (req, file, cb) => {
  if (file.mimetype == "image/png" || file.mimetype == "image/jpeg") {
    cb(null, true);
  } else {
    cb(new Error("image format not valid..."));
  }
};

const upload = multer({
  storage: storage,
  fileFilter: multerFiltering,
  // dest: "public/images/users",
});

module.exports = upload;
