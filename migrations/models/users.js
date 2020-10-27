'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('users', {
    username: {
      allowNull: false,
      type: Sequelize.STRING
    },
    password: {
      allowNull: false,
      type: Sequelize.STRING
    },
    email: {
      allowNull: false,
      unique: true,
      type: Sequelize.STRING
    },
  }, {});
  User.associate = function(models) {
    // associations can be defined here
  };
  return User;
};
