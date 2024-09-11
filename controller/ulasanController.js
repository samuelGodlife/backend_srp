const kategoriModel = require("../models/ulasanModel");
const barangModel = require("../models/barangModels");
const objectId = require("mongoose").Types.ObjectId;

exports.inputKategori = (data) =>
  new Promise(async (resolve, reject) => {
    try {
      // Mencari semua ulasan berdasarkan nama_wisata
      const kategori = await kategoriModel.find({
        nama_wisata: data.nama_wisata,
      });

      console.log(kategori);

      // Menghitung total rating saat ini dan jumlah ulasan yang ada
      let totalRating = 0;
      let jumlahUlasan = kategori.length;

      kategori.forEach((ulasan) => {
        totalRating += ulasan.rating;
      });

      // Tambahkan rating ulasan baru ke total rating
      totalRating += data.rating;
      jumlahUlasan += 1; // Tambah 1 untuk ulasan baru

      // Hitung rata-rata rating
      const rataRataRating = parseFloat(
        (totalRating / jumlahUlasan).toFixed(1)
      );

      // Menyimpan data ulasan baru
      data.total_rating = rataRataRating;
      console.log(data.total_rating);
      console.log(data);

      await kategoriModel.create(data);

      await barangModel.updateOne(
        { nama_wisata: data.nama_wisata },
        { $set: { rating: rataRataRating } }
      );

      resolve({
        status: true,
        msg: "Berhasil Tambah Ulasan",
        // rataRataRating: rataRataRating,
        // jumlahUlasan: jumlahUlasan,
      });
    } catch (err) {
      reject({
        status: false,
        msg: "Terjadi kesalahan",
        error: err,
      });
    }
  });

exports.updateKategoriById = (id, data) =>
  new Promise((resolve, reject) => {
    kategoriModel
      .findOne({ _id: objectId(id) })
      .then((kategori) => {
        if (kategori) {
          kategoriModel
            .updateOne({ _id: objectId(id) }, data)
            .then(() => {
              resolve({
                status: true,
                msg: "Berhasil Update Ulasan",
              });
            })
            .catch((err) => {
              reject({
                status: false,
                msg: "Terjadi kesalahan asa",
              });
            });
        } else {
          reject({
            status: false,
            msg: "Kategori tidak ditemukan",
          });
        }
      })
      .catch((error) => {
        reject({
          status: false,
          msg: "Terjadi kesalahan",
        });
      });
  });

exports.getAllKategori = (idUser) =>
  new Promise((resolve, reject) => {
    console.log(idUser);
    kategoriModel
      .find({
        nama_wisata: idUser,
      })
      .then((kategori) => {
        if (kategori.length > 0) {
          resolve({
            status: true,
            msg: "berhasil memuat data kategori",
            data: kategori,
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
          msg: "Terjadi Kesalahan Pada user",
        });
      });
  });

exports.getKategoriById = (idKategori) =>
  new Promise((resolve, reject) => {
    kategoriModel
      .findOne({ _id: objectId(idKategori) })
      .then((kategori) => {
        if (kategori) {
          resolve({
            status: true,
            msg: "berhasil memuat data kategori",
            data: kategori,
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
          msg: "Terjadi Kesalahan Pada user",
        });
      });
  });

exports.deleteKategori = (idKategori) =>
  new Promise((resolve, reject) => {
    kategoriModel
      .deleteOne({ _id: objectId(idKategori) })
      .then(() => {
        resolve({
          status: true,
          msg: "Berhasil Menghapus Data",
        });
      })
      .catch((err) => {
        reject({
          status: false,
          msg: "Tidak Bisa",
        });
      });
  });

//https://pastebin.com/Wju2Z2dy
//https://pastebin.com/5TaDHYm9
