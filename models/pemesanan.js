"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class pemesanan extends Model {
    static associate(models) {
      // define association here
      this.hasMany(models.detail_pemesanan, {
        foreignKey: `id`,
      });

      this.belongsTo(models.user);
      this.belongsTo(models.tipe_kamar);
    }
  }
  pemesanan.init(
    {
      nomor_pemesanan: DataTypes.INTEGER,
      nama_pemesan: DataTypes.STRING,
      email_pemesan: DataTypes.STRING,
      tgl_pemesanan: DataTypes.DATE,
      tgl_check_in: DataTypes.DATE,
      tgl_check_out: DataTypes.DATE,
      nama_tamu: DataTypes.STRING,
      jumlah_kamar: DataTypes.INTEGER,
      id_tipe_kamar: DataTypes.INTEGER,
      status_pemesanan: DataTypes.ENUM('baru','check in','check out'),
      id_user: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "pemesanan",
    }
  );
  return pemesanan;
};
