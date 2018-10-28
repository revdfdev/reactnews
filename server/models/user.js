'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING,
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    categories: DataTypes.TEXT,
    languages: DataTypes.TEXT,
    countries: DataTypes.TEXT,
    active: DataTypes.BOOLEAN,
  }, {});
  User.associate = function(models) {
    // associations can be defined here
  };
  return User;
};