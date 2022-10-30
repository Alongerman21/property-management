const express = require("express");
const listings = express.Router();
const listingService = require("../services/listingService");

listings.get("/:userId", async ({ params: { userId } }, res, next) => {
  try {
    res.send(await listingService.findAllListingsByUserId(userId));
  } catch (error) {
    next(error);
  }
});

listings.post("/", async ({ body }, res, next) => {
  try {
    res.send(await listingService.addListing(body));
  } catch (error) {
    next(error);
  }
});

listings.delete("/:lisId", async ({ params: { lisId } }, res, next) => {
  try {
    await listingService.deleteListing(lisId);
    res.send();
  } catch (error) {
    next(error);
  }
});

module.exports = listings;
