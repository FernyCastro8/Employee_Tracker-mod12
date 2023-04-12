const { Model, DataTypes } = require('sequelize');
const connection = require('../config/connection');

class staff extends Model { }

// needs to be worked on !!
staff.init({
  title: {
    type: DataTypes.STRING
  },
  instructor: {
    type: DataTypes.STRING
  },
  cost: {
    type: DataTypes.INTEGER
  }
}, {
  sequelize: connection,
  modelName: 'course'
});

module.exports = staff;