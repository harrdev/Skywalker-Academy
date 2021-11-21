'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class planetjoin extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  planetjoin.init({
    userId: DataTypes.INTEGER,
    faveplanetId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'planetjoin',
  });
  return planetjoin;
};