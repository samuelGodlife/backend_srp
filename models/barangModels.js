const mongoose = require("mongoose");
const objectId = mongoose.Types.ObjectId;

const barangScheme = new mongoose.Schema({
  nama_wisata: {
    type: String,
  },
  jenis: {
    type: String,
  },
  alamat: {
    type: String,
  },
  lattitude: {
    type: String,
  },
  longtitude: {
    type: String,
  },
  deskripsi: {
    type: String,
  },
  gambar: {
    type: String,
  },
});

module.exports = mongoose.model("wisata", barangScheme);
