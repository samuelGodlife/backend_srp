const router = require("express").Router();
const barangController = require("../controller/barangController");

const utilApps = require("../utils/utils_apps");
const multer = require("multer");
const barangModels = require("../models/barangModels");
const { isObjectIdOrHexString } = require("mongoose");
const uploadFile = multer({
  storage: utilApps.uploadFile,
}).single("gambar");

router.post("/input", uploadFile, (req, res) => {
  let newBody = JSON.parse(req.body.data);
  if (req.file === undefined) {
    res.json({
      status: false,
      msg: "Data tidak boleh kosong",
    });
  } else {
    req.body.gambar = req.file.filename;
    newBody.gambar = req.body.gambar;
  }

  barangController
    .input(newBody)
    .then((result) => {
      res.json(result);
    })
    .catch((error) => {
      res.json(error);
    });
});

router.get("/get-all-barang", (req, res) => {
  barangController
    .getAllBarang()
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      res.json(err);
    });
});

router.get("/get/:jenis", (req, res) => {
  // console.log(req.params.jenis);
  barangController
    .getJenis(req.params.jenis)
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      res.json(err);
    });
});

router.get("/get-barang-by-id/:idBarang", (req, res) => {
  console.log(req.params.idBarang);
  barangController
    .getBarangById(req.params.idBarang)
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      res.json(err);
    });
});

router.put("/update/:idBarang", uploadFile, (req, res) => {
  let newBody = JSON.parse(req.body.data);
  let gambar = utilApps.cekNull(req.file);
  if (gambar !== null) {
    newBody.gambar = gambar;
  }
  console.log(req);
  barangController
    .update(req.params.idBarang, newBody)
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      res.json(err);
    });
});

router.delete("/delete/:idBarang", (req, res) => {
  barangController
    .delete(req.params.idBarang)
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      res.json(err);
    });
});

module.exports = router;
