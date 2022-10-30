const mongoose = require("mongoose");

const listingSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  address: { type: String, required: true },
  city: { type: String, required: true },
  price: { type: String, required: true },
  thumbnail: { type: String },
  residents: [
    { type: mongoose.Schema.Types.ObjectId, ref: "Resident", default: [] },
  ],
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

const Listing = mongoose.model("listing", listingSchema);

module.exports = Listing;
