'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class faveplanet extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.faveplanet.belongsToMany(models.user, {through: 'planetjoins'})
    }
  };
  faveplanet.init({
    name: DataTypes.STRING,
    population: DataTypes.STRING,
    gravity: DataTypes.STRING,
    terrain: DataTypes.STRING,
    diameter: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'faveplanet',
  });
  return faveplanet;
};