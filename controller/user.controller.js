const { response } = require("../routes/user.routes");

/** load model for table 'users' */
const userModel = require(`../models/index`).user;

/** load Operation from Sequelize */
const Op = require(`sequelize`).Op;

/** load library 'path' and 'filestream' */
const path = require(`path`);
const fs = require(`fs`);

const upload = require("./upload-user").single(`foto`);
const md5 = require(`md5`);
let password = md5(`password`);
const jsonwebtoken  = require("jsonwebtoken");
const SECRET_KEY = "secretcode"


/** function to read all data */
exports.getAllUser = async (request, response) => {
  let users = await userModel.findAll();
  return response.json({
    success: true,
    data: users,
    message: `All Users have been loaded`,
  });
};

exports.login = async (req, res) => {
  try {
      const params = {
          email : req.body.email,
          password : md5(req.body.password),
      };
      console.log(params)

      const findUser = await userModel.findOne({ where : params});
      if(findUser == null){
          return res.status(404).json({
              message : "email or password doesn't match",
              err : error,
          });
      }
      console.log(findUser)

      let tokenPayload = {
          id_user: findUser.id_customer,
          email: findUser.email,
          role : findUser.role,
      };
      tokenPayload = JSON.stringify(tokenPayload);
      let token = await jsonwebtoken.sign(tokenPayload, SECRET_KEY);

      return res.status(200).json({
          message : "Success login",
          data : {
              token: token,
              id_user : findUser.id_user,
              email : findUser.email,
              role : findUser.role,
          },
      });
  } catch (err) {
      console.log(err);
      return res.status(500).json({
          message: "Internal error",
          err : err,
      });
  }
};

exports.findUser = async (request, response) => {
  let nama_user = request.body.nama_user;
  let email = request.body.email;
  let role = request.body.role;

  let users = await userModel.findAll({
    where: {
      [Op.or]: [
        { nama_user: { [Op.substring]: nama_user } },
        { email: { [Op.substring]: email } },
        { role: { [Op.substring]: role } },
      ],
    },
  });
  return response.json({
    success: true,
    data: users,
    message: `All Users have been loaded`,
  });
};

exports.addUser = (request, response) => {
  upload(request, response, async (error) => {
    if (error) {
      console.log("err");
      return response.json({ message: error });
    }
    if (!request.file) {
      return response.json({ message: `Nothing file to Upload` });
    }
    let newUser = {
      nama_user: request.body.nama_user,
      foto: request.file.filename,
      email: request.body.email,
      password: md5(request.body.password),
      role: request.body.role,
    };
    console.log(newUser);
    userModel
      .create(newUser)
      .then((result) => {
        return response.json({
          success: true,
          data: result,
          message: `New User has been inserted`,
        });
      })
      .catch((error) => {
        return response.json({
          succes: false,
          messagee: error.message,
        });
      });
  });
};

exports.updateUser = async (request, response) => {
  let dataUser = {
    nama_user: request.body.nama_user,
    email: request.body.email,
    password: md5(request.body.password),
    role: request.body.role,
  };
  if (request.file) {
    const selectedUser = await userModel.findOne({
      where: { id: id },
    });
    const oldImageUser = selectedUser.image;
    const pathImage = path.join(__dirname, `../foto_prib`, oldImageUser);
    if (fs.existsSync(pathImage)) {
      fs.unlink(pathImage, (error) => console.log(error));
    }
    user.foto = request.file.filename;
  }
  userModel
    .update(dataUser, { where: { id: idUser } })
    .then((result) => {
      return response.json({
        succes: true,
        messagee: `Data user has been update`,
      });
    })
    .catch((error) => {
      return response.json({
        succes: false,
        message: error.message,
      });
    });
};
exports.deleteUser = async (request, response) => {
  const idUser = request.params.id;
  const user = await userModel.findOne({where: {id : id}})
  const pict = user.foto

  const pathPhoto = path.join(__dirname, `../foto_prib`, pict)

  if(fs.existsSync(pathPhoto)) {
    fs.unlink(pathPhoto, error => console.log(error))
  }
  userModel
    .destroy({ where: { id: idUser } })
    .then(result => {
      return response.json({
        success: true,
        message: `Data user has been deleted`,
      });
    })
    .catch((error) => {
      return response.json({
        success: false,
        message: error.message,
      });
    });
};
