const router = require("express").Router();
const transaksiController = require("../controller/transaksiController");
const utilApps = require("../utils/utils_apps");
const multer = require("multer");
const uploadFile = multer({
  storage: utilApps.uploadFile,
}).single("bukti");

router.post("/input-transaksi", (req, res) => {
  transaksiController
    .inputTransaksi(req.body)
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      res.json(err);
    });
});

router.put("/updateWeb/:idTransaksi", (req, res) => {
  transaksiController
    .update(req.params.idTransaksi, req.body)
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      res.json(err);
    });
});

router.put("/update/:idTransaksi", uploadFile, (req, res) => {
  let newBody = req.body.status;
  let dataUpdate;
  let bukti = utilApps.cekNull(req.file);
  if (bukti !== null) {
    newBody.bukti = bukti;
    dataUpdate = {
      status: req.body.status,
      bukti: bukti,
    };
  }
  transaksiController
    .update(req.params.idTransaksi, dataUpdate)
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      res.json(err);
    });
});

router.get("/get-all-transaksi", (req, res) => {
  transaksiController
    .getAllTransaksi()
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      res.json(err);
    });
});

router.get("/get-transaksi-by-id/:idTransaksi", (req, res) => {
  transaksiController
    .getTransaksiById(req.params.idTransaksi)
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      res.json(err);
    });
});

router.get("/get-transaksi-by-idUser/:idUser", (req, res) => {
  transaksiController
    .getTransaksiByidUser(req.params.idUser)
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      res.json(err);
    });
});

router.delete("/delete-transaksi/:idTransaksi", (req, res) => {
  transaksiController
    .deleteTransaksi(req.params.idTransaksi)
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      res.json(err);
    });
});

module.exports = router;
