'use strict';
module.exports = (sequelize, DataTypes) => {
  const AdUnit = sequelize.define('AdUnit', {
    unit_name: DataTypes.STRING,
    unit_price: DataTypes.DECIMAL
  }, {});
  AdUnit.associate = (models) => {
    // associations can be defined here
  };
  return AdUnit;
};
