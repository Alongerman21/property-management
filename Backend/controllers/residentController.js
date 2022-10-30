const express = require("express");
const residents = express.Router();
const residentService = require("../services/residentService");

residents.get("/:ownerId", async ({ params: { ownerId } }, res, next) => {
  try {
    res.send(await residentService.findAllResidents(ownerId));
  } catch (error) {
    next(error);
  }
});

residents.get("/:resId", async ({ params: { resId } }, res, next) => {
  try {
    res.send(await residentService.findById(resId));
  } catch (error) {
    next(error);
  }
});

residents.post("/", async ({ body }, res, next) => {
  try {
    res.send(await residentService.insertNewResident(body));
  } catch (error) {
    next(error);
  }
});

residents.delete("/:resId", async ({ params: { resId } }, res, next) => {
  try {
    await residentService.deleteResident(resId);
    res.send();
  } catch (error) {
    next(error);
  }
});

module.exports = residents;
