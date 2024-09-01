const multer = require("multer");
const randomstring = require("randomstring");
const path = require("path");
const MAX_SIZE = 20000000;
const fs = require("fs");
const crypto = require("crypto");

const uploadFile = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/images");
  },
  filename: function (req, file, cb) {
    const ext = file.originalname.substring(
      file.originalname.lastIndexOf("."),
      file.originalname.length
    );
    cb(null, Date.now() + "-" + randomstring.generate(12) + ext);
  },
});

const cekNull = (fileUpload) => {
  if (fileUpload === undefined || fileUpload === null) {
    return null;
  } else {
    return fileUpload.filename;
  }
};

const deleteImage = (image) => {
  fs.unlinkSync(`./statics/${image}`);
};
module.exports = {
  cekNull,
  deleteImage,
  uploadFile: uploadFile,
};
