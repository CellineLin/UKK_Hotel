const express = require(`express`);
const upload = require("../controller/upload-user");
const app = express();
const auth = require("../auth/auth");

app.use(express.json());

const UserController = require("../controller/user.controller");

app.get("/getAllUser", auth.authVerify, UserController.getAllUser);
app.post("/login", UserController.login);
app.post("/find", auth.authVerify, UserController.findUser);
app.post("/addUser", auth.authVerify, UserController.addUser);
app.put("/update/:id", auth.authVerify, UserController.updateUser);
app.delete("/delete/:id", auth.authVerify, UserController.deleteUser);

module.exports = app;
