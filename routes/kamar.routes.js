const express = require(`express`);
const upload = require("../controller/upload-kamar");
const app = express();

app.use(express.json());

const kamarController = require("../controller/kamar.controller");

app.get("/", kamarController.getAllKamar);
app.post("/find", kamarController.findKamar);
app.post("/", kamarController.addKamar);
app.put("/:id", kamarController.updateKamar);
app.delete("/:id", kamarController.deleteKamar);

module.exports = app;
