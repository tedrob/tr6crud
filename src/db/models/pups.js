'use strict';
module.exports = (sequelize, DataTypes) => {
  console.log('model pups define');
  const pups = sequelize.define('pups', {
    name: DataTypes.STRING,
    breed: DataTypes.STRING,
    age: DataTypes.INTEGER,
    sex: DataTypes.STRING
  }, {});
  pups.associate = function(models) {
    // associations can be defined here
  };
  return pups;
};
