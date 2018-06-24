'use strict';
module.exports = (sequelize, DataTypes) => {
  console.log('model adunit define');
  const AdUnit = sequelize.define('AdUnit', {
    unit_name: DataTypes.STRING,
    unit_price: DataTypes.DECIMAL
  }, {});
  AdUnit.associate = (models) => {
    // associations can be defined here
  };
  return AdUnit;
};
