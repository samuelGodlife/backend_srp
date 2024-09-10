const router = require("express").Router();

const keranjangController = require("../controller/ulasanController");

router.post("/input", (req, res) => {
  keranjangController
    .inputKategori(req.body)
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      res.json(err);
    });
});

router.get("/get-all/:idUser", (req, res) => {
  keranjangController
    .getAllKategori(req.params.idUser)
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      res.json(err);
    });
});

router.get("/get-by-id/:idKeranjang", (req, res) => {
  keranjangController
    .getKeranjangById(req.params.idKeranjang)
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      res.json(err);
    });
});

router.put("/update/:idKeranjang", (req, res) => {
  keranjangController
    .updateKategoriById(req.params.idKeranjang, req.body)
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      res.json(err);
    });
});

router.delete("/delete/:idKeranjang", (req, res) => {
  keranjangController
    .deleteKeranjang(req.params.idKeranjang)
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      res.json(err);
    });
});

module.exports = router;
