const router = require("express").Router();
const { application } = require("express");
const { route } = require("express/lib/application");
const controllerUser = require("../controller/userController");
const controllerKategori = require("../controller/kategoriController");

router.post("/registrasi", (req, res) => {
  controllerUser
    .registrasiUser(req.body)
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      res.json(err);
    });
});

router.post("/login", (req, res) => {
  controllerUser
    .loginUser(req.body)
    .then((result) => {
      console.log(result);
      res.json(result);
    })
    .catch((err) => {
      res.json(err);
    });
});

router.post("/inputKategori", (req, res) => {
  controllerKategori
    .inputKategori(req.body)
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      res.json(err);
    });
});

router.put("/update/:id", (req, res) => {
  controllerUser
    .updateUser(req.params.id, req.body)
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      res.json(err);
    });
});

router.put("/updateWeb/:id", (req, res) => {
  controllerUser
    .updateWeb(req.params.id, req.body)
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      res.json(err);
    });
});

router.get("/user-get-all", (req, res) => {
  controllerUser
    .getAllUser(req.body)
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      res.json(err);
    });
});

router.get("/user-get-id/:id", (req, res) => {
  controllerUser
    .getId(req.params.id)
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      res.json(err);
    });
});
module.exports = router;

//app.use('/users', require())
