'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class favepeople extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.favepeople.belongsToMany(models.user, {through: 'peoplejoins'})
    }
  };
  favepeople.init({
    name: DataTypes.STRING,
    birthYear: DataTypes.STRING,
    height: DataTypes.STRING,
    hair: DataTypes.STRING,
    eyes: DataTypes.STRING,
    homeworld: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'favepeople',
  });
  return favepeople;
};