const mongoose = require("mongoose");
const residents = require("../controllers/residentController");
const Listing = require("../models/listing");

module.exports.findAllListingsByUserId = async (userId) =>
  await Listing.find({
    owner: mongoose.Types.ObjectId(userId),
  })
    .lean()
    .populate("owner")
    .populate("tenants");

module.exports.addListing = async (litsing) => {
  return await Listing.findOneAndUpdate(
    { _id: mongoose.Types.ObjectId(litsing._id) },
    litsing,
    { upsert: true }
  );
};

module.exports.deleteListingById = async (lisId) =>
  await Listing.findByIdAndDelete(lisId).lean();
