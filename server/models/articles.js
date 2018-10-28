'use strict';
module.exports = (sequelize, DataTypes) => {
  const Articles = sequelize.define('Articles', {
    author: DataTypes.STRING,
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    url: DataTypes.STRING,
    urlToImage: DataTypes.STRING,
    publishedAt: DataTypes.STRING,
    content: DataTypes.STRING
  }, {});
  Articles.associate = function(models) {
    models.Articles.belongsTo(models.Sources, {
      onDelete: "CASCADE",
      foreignKey: {
        allowNull: false,
        foreignKey: 'fk_source_id', 'targetKey': 'source_id'
      }
    })
  };
  return Articles;
};