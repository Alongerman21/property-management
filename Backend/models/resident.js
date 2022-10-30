const mongoose = require("mongoose");

const residentSchema = new mongoose.Schema({
  _id: { type: String },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  phone: { type: String, required: true },
  id: { type: Number, required: true },
  email: { type: String },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

const Resident = mongoose.model("Resident", residentSchema);

module.exports = Resident;
