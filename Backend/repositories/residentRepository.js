const Resident = require("../models/resident");
const mongoose = require("mongoose");

module.exports.findAllResidents = async (ownerId) => {
  return await Resident.find({owner:mongoose.Types.ObjectId(ownerId)}).lean().populate("owner");
};

module.exports.findById = async (id) =>
  await Resident.findById(id).lean().populate("owner");

module.exports.insertNewResident = async (resident) =>{
 return await Resident.findOneAndUpdate({_id: mongoose.Types.ObjectId(resident._id)}, resident,{upsert: true})
}


module.exports.deleteResidentById = async (resId) =>
  await Resident.findByIdAndDelete(resId).lean();
