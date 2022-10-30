const listingRepository = require("../repositories/listingRepository");
const mongoose = require("mongoose");

module.exports.findAllListingsByUserId = async (userId) =>
  await listingRepository.findAllListingsByUserId(userId);

module.exports.addListing = async (listing) => {
  return await listingRepository.addListing(listing);
};

module.exports.deleteListing = async (lisId) =>  await listingRepository.deleteListingById(lisId);
