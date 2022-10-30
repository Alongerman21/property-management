const residentsRepository = require("../repositories/residentRepository");

module.exports.findAllResidents = async (ownerId) =>
  await residentsRepository.findAllResidents(ownerId);

module.exports.findById = async (resId) =>
  await residentsRepository.findById(resId);

module.exports.insertNewResident = async (newResident) => {
 await residentsRepository.insertNewResident(newResident);
};
  
module.exports.deleteResident = async (resId) =>
await residentsRepository.deleteResidentById(resId);

