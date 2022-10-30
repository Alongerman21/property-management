const usersRepository = require("../repositories/usersRepository");

module.exports.saveNewUser = async (newUser) => {
  const user = await usersRepository.insertNewUser(newUser);

  return user;
};

module.exports.getUserByCredentials = async (name, password) =>
  await usersRepository.findByCredentials(name, password);
