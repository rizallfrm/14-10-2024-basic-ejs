const Imagekit = require("imagekit");
require("dotenv").config();

const imagekit = new Imagekit({
  publicKey: process.env.publicKey,
  privateKey: process.env.privateKey,
  urlEndpoint: process.env.urlEndpoint,
});

module.exports = imagekit;
