const User = require("../models/user");

module.exports.findByCredentials = async (name, password) => {
  const user = await User.findOne({ name, password }).lean();

  return user;
};

module.exports.insertNewUser = async (user) => await User.create(user);
