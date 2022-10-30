const express = require("express");
const cors = require("cors");
require("./dbConnection/db");
const { error } = require("./middlewares/error");

const usersController = require("./controllers/usersController");
const listingController = require("./controllers/listingController");
const residentController = require("./controllers/residentController");

const app = express();

app.use(cors());

const port = 3000;

app.use(express.json());

app.use("/users", usersController);
app.use("/listings", listingController);
app.use("/residents", residentController);

app.use(error);

app.listen(port, () => console.log(`Server is listening on port ${port}`));
