"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class kamar extends Model {

    static associate(models) {
      // define association here
      this.hasMany(models.detail_pemesanan, {
        foreignKey: `id_detail_pemesanan`,
      });
      this.belongsTo(models.tipe_kamar);
    }
  }
  kamar.init(
    {
      nomor_kamar: DataTypes.INTEGER,
      id_tipe_kamar: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "kamar",
    }
  );
  return kamar;
};
