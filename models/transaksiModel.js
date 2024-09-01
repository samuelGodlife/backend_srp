const mongoose = require("mongoose");
const objectId = mongoose.Types.ObjectId;

const transaksiSchema = new mongoose.Schema({
  idUser: {
    type: objectId,
  },
  grandTotal: {
    type: Number,
  },
  date: {
    type: String,
  },
  status: {
    type: String,
  },
  bukti: {
    type: String,
  },
  detailTransaksi: JSON,
});

module.exports = mongoose.model("transaksi", transaksiSchema);
