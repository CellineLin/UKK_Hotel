"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    static associate(models) {
      // define association here
      this.hasOne(models.pemesanan, {
        foreignKey: `id`,
        as: "booked",
      });
    }
  }
  user.init(
    {
      nama_user: DataTypes.STRING,
      foto: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      role: DataTypes.ENUM("admin", "resepsionis"),
    },
    {
      sequelize,
      modelName: "user",
    }
  );
  return user;
};
