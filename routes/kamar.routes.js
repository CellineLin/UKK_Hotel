const express = require(`express`);
const app = express();

app.use(express.json());

const kamarController = require("../controller/kamar.controller");

app.get("/", kamarController.getAllKamar);
app.post("/find", kamarController.findkamar);
app.post("/", kamarController.addKamar);
app.put("/:id", kamarController.updateKamar);
app.delete("/:id", kamarController.deleteKamar);

module.exports = app;
