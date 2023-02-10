const express = require(`express`);
const upload = require("../controller/upload-user");
const app = express();

app.use(express.json());

const UserController = require("../controller/user.controller");

app.get("/", UserController.getAllUser);
app.post("/find", UserController.findUser);
app.post("/", UserController.addUser);
app.put("/:id", UserController.updateUser);
app.delete("/:id", UserController.deleteUser);

module.exports = app;
