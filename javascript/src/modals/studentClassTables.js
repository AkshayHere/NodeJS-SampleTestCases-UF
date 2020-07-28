const { DataTypes, Model } = require('sequelize');

import sequelize from '../config/database';
// import Logger from '../config/logger';
// const LOG = new Logger('studentClassTables.js');

class StudentClassTables extends Model { }

StudentClassTables.init({
  class_code: {
    type: DataTypes.STRING,
    allowNull: false
  },
  student_email: {
    type: DataTypes.STRING,
    allowNull: false
  },
}, 
{
  sequelize, // We need to pass the connection instance
  modelName: 'studentClassTables', // We need to choose the model name
  timestamps: false,
});

export default StudentClassTables;