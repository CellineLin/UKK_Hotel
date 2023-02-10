const { response } = require("../routes/kamar.routes");

/** load model for table 'kamar' */
const kamarModel = require(`../models/index`).kamar;

/** load Operation from Sequelize */
const Op = require(`sequelize`).Op;

/** load library 'path' and 'filestream' */
const path = require(`path`);
const fs = require(`fs`);

const upload = require("./upload-kamar").single(`foto`);
const md5 = require(`md5`);
let password = md5(`password`);


/** function to read all data */
exports.getAllKamar = async (request, response) => {
  let kamar = await kamarModel.findAll();
  return response.json({
    success: true,
    data: kamars,
    message: `All room have been loaded`,
  });
};
exports.findkamar = async (request, response) => {
  let id_kamar = request.body.id_kamar;
  let nomor_kamar = request.nomor_kamar;

  let kamars = await kamarModel.findAll({
    where: {
      [Op.or]: [
        { id_kamar: { [Op.substring]: id_kamar } },
        { nomor_kamar: { [Op.substring]: nomor_kamar } },
      ],
    },
  });
  return response.json({
    success: true,
    data: users,
    message: `All kamar have been loaded`,
  });
};

exports.addKamar = (request, response) => {
  upload(request, response, async (error) => {
    if (error) {
      console.log("err");
      return response.json({ message: error });
    }
    if (!request.file) {
      return response.json({ message: `Nothing file to Upload` });
    }
    let newKamar = {
      id_kamar: request.body.id_kamar,
      nomor_kamar: request.body.nomor_kamar,
    };
    console.log(newKamar);
    kamarModel
      .create(newKamar)
      .then((result) => {
        return response.json({
          success: true,
          data: result,
          message: `New kamar has been inserted`,
        });
      })
      .catch((error) => {
        return response.json({
          succes: false,
          message: error.message,
        });
      });
  });
};

exports.updateKamar = async (request, response) => {
  let dataKamar = {
    id_kamar: request.body.id_kamar,
    nomor_kamar: request.body.nomor_kamar,
  };
  kamarModel
    .update(dataKamar, { where: { id: id_kamar } })
    .then((result) => {
      return response.json({
        succes: true,
        messagee: `Data room has been update`,
      });
    })
    .catch((error) => {
      return response.json({
        succes: false,
        message: error.message,
      });
    });
};
exports.deleteKamar = async (request, response) => {
  const id_kamar = request.params.id;
  const kamar = await userModel.findOne({where: {id : id}})

  userKamar
    .destroy({ where: { id: id_kamar } })
    .then(result => {
      return response.json({
        success: true,
        message: `Data kamar has been deleted`,
      });
    })
    .catch((error) => {
      return response.json({
        success: false,
        message: error.message,
      });
    });
};
