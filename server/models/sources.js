'use strict';
module.exports = (sequelize, DataTypes) => {
  const Sources = sequelize.define('Sources', {
    source_id: DataTypes.STRING,
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    url: DataTypes.STRING,
    category: DataTypes.STRING,
    language: DataTypes.STRING,
    country: DataTypes.STRING
  }, {});
  Sources.associate = function(models) {
    models.Sources.hasMany(models.Articles);
  };
  return Sources;
};