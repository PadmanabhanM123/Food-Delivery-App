const { DataTypes } = require('sequelize');
const sequelize = require('../database');

const Users = sequelize.define('clients', {
  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email:{
    type: DataTypes.STRING,
    allowNull:false
  },
  dob:{
    type: DataTypes.DATE,
    allowNull:false
  }
},{
    tableName:'clients',
    timestamps:false
});

module.exports = Users;
