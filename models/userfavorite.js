'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class userFavorite extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      //models.userFavorite.belongsToMany(models.user)
      //models.userFavorite.belongsTo(models.favorite)
    }
  };
  userFavorite.init({
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'userFavorite',
  });
  return userFavorite;
};