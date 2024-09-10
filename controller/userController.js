const userModel = require("../models/userModels");
const bcrypt = require("bcrypt");

exports.registrasiUser = (data) =>
  new Promise(async (resolve, reject) => {
    const salt = bcrypt.genSaltSync(10);
    const encript = bcrypt.hashSync(data.password, salt);
    Object.assign(data, {
      password: encript,
    });

    userModel
      .findOne({
        email: data.email,
      })
      .then((sudahAdaUser) => {
        if (sudahAdaUser) {
          reject({
            status: false,
            msg: "Email Sudah Terdaftar",
          });
        } else {
          userModel
            .create(data)
            .then(() => {
              resolve({
                status: true,
                msg: "Berhasil Membuat User Baru",
              });
            })
            .catch((err) => {
              reject({
                status: false,
                msg: "Terjadi Kesalahan Pada Server",
              });
            });
        }
      });
  });
// LOGIN USER

exports.loginUser = (data) =>
  new Promise(async (resolve, reject) => {
    const { userName, password } = data;

    console.log(userName, password);

    userModel.findOne({ userName: userName }).then((user) => {
      if (user) {
        const isValid = bcrypt.compareSync(password, user.password);

        if (!isValid) {
          return resolve({
            status: false,
            msg: "password Salah!",
          });
        }

        resolve({
          status: true,
          msg: "Login Berhasil",
          data: user,
        });
      } else {
        reject({
          status: false,
          msg: "Email Anda Tidak Terdaftar",
        });
      }
    });
  });

exports.getAllUser = () =>
  new Promise((resolve, reject) => {
    userModel
      .find({})
      .then((user) => {
        if (user.length > 0) {
          resolve({
            status: true,
            msg: "Berhasil memuat data",
            data: user,
          });
        } else {
          reject({
            status: false,
            msg: "Tidak ada data",
          });
        }
      })
      .catch((err) => {
        reject({
          status: false,
          msg: "Terjadi kesalahan pada server",
        });
      });
  });

exports.getId = (id) =>
  new Promise((resolve, reject) => {
    console.log(id);
    userModel
      .find({
        _id: id,
      })
      .then((user) => {
        console.log(user.length);
        console.log("ANJADNJAD");
        if (user.length > 0) {
          console.log(user);
          resolve({
            status: true,
            msg: "Berhasil memuat data",
            data: user,
          });
        } else {
          reject({
            status: false,
            msg: "Tidak ada data",
          });
        }
      })
      .catch((err) => {
        reject({
          status: false,
          msg: "Terjadi kesalahan pada server",
        });
      });
  });

exports.updateUser = (id, data) =>
  new Promise((resolve, reject) => {
    console.log(id);
    userModel
      .findOne({ _id: id })
      .then((user) => {
        console.log("apa ini");
        // console.log(user);
        if (user) {
          // Menambahkan 5 ke poin yang sudah ada, atau set ke 5 jika belum ada
          // console.log(user);
          console.log(user);
          const newPoint = (user.point || 0) + 5;
          const updatedData = {
            ...data,
            point: newPoint,
          };
          console.log(updatedData);
          userModel
            .updateOne({ _id: id }, updatedData)
            .then(() => {
              resolve({
                status: true,
                msg: "Berhasil Update user dan tambah 5 poin",
              });
            })
            .catch((err) => {
              reject({
                status: false,
                msg: "Terjadi kesalahan saat mengupdate user",
              });
            });
        } else {
          reject({
            status: false,
            msg: "User tidak ditemukan",
          });
        }
      })
      .catch((error) => {
        reject({
          status: false,
          msg: "Terjadi kesalahan saat mencari user",
        });
      });
  });
