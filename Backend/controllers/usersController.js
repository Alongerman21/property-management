const express = require("express");
const users = express.Router();
const userService = require("../services/usersService");

users.post("/register", async ({ body }, res, next) => {
  try {
    const user = await userService.saveNewUser(body);
    res.send(user);
  } catch (error) {
    next(error);
  }
});

users.post("/login", async ({ body: { name, password } }, res, next) => {
  try {
    const user = await userService.getUserByCredentials(name, password);
    res.send(user);
  } catch (error) {
    next(error);
  }
});

module.exports = users;
