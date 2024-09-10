const mongoose = require("mongoose");
const objectId = mongoose.Types.ObjectId;

const barangScheme = new mongoose.Schema({
  userName: {
    type: String,
  },
  nama_wisata: {
    type: String,
  },
  ulasan: {
    type: String,
  },
  rating: {
    type: Number,
  },
  tgl: {
    type: String,
  },
});

module.exports = mongoose.model("ulasan", barangScheme);
