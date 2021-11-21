'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class peoplejoin extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  peoplejoin.init({
    userId: DataTypes.INTEGER,
    favepersonId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'peoplejoin',
  });
  return peoplejoin;
};