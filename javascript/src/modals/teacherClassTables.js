const { DataTypes, Model } = require('sequelize');

import sequelize from '../config/database';
// import Logger from '../config/logger';
// const LOG = new Logger('teacherClassTables.js');

class TeacherClassTables extends Model { }

TeacherClassTables.init({
  class_code: {
    type: DataTypes.STRING,
    allowNull: false
  },
  teacher_email: {
    type: DataTypes.STRING,
    allowNull: false
  },
  subject_code: {
    type: DataTypes.STRING,
    allowNull: false
  },
}, 
{
  sequelize, // We need to pass the connection instance
  modelName: 'teacherClassTables', // We need to choose the model name
  timestamps: false,
});

export default TeacherClassTables;