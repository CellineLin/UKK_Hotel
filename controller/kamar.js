const { route } = require("../routes/kamar.routes");

const kamar = async (req, res) => {
  try {
    const findKamar = await kamar.findOne({ where: params });
    if (findKamar == null) {
      return res.status(404).json({
        message: "there's no room found",
        err: error,
      });
    }
    console.log(findKamar);

    let id_kamar = {
      success: true,
      data: id_kamar,
      message: `All Room Types have been loaded`,
    };
    id_kamar = JSON.stringify(id_kamar);

    return res.status(200).json({
      message: "Success",
      data: {
        id_kamar: id_kamar,
        // id_id_kamar: findKamar.id_id_kamar,
        nomor_kamar: findKamar.nomor_kamar,
      },
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "Internal error",
      err: err,
    });
  }
};

const addKamar = async (req, res) => {
  try {
    const data = {
      kamar_name: req.body.kamar_name,
    };

    const { upload } = require("../utils/upload");
    const router = new express.Router();
    const auth = require("../auth/auth");

    router.post("/add", upload.single("photo"), kamarController.addKamar);
    router.put(
      "/update/:id_kamar",
      auth.authVerify,
      upload.single("photo"),
      kamarController.updateKamar
    );
    router.delete(
      "/delete/:id_kamar",
      auth.authVerify,
      kamarController.deleteKamar
    );
    router.get("/", auth.authVerify, kamarController.deleteKamar);
    router.get("/:id_kamar", auth.authVerify, kamarController.findOneKamar);
  } catch {}
};

module.exports = router;
