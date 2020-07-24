const { DataTypes, Model } = require('sequelize');

import sequelize from '../config/database';
// import Logger from '../config/logger';
// const LOG = new Logger('mapTeacherStudent.js');

class MapTeacherStudent extends Model { }

MapTeacherStudent.init({
  teacher_email: {
    type: DataTypes.STRING,
    allowNull: false
  },
  student_email: {
    type: DataTypes.STRING,
    allowNull: false
  },
  to_delete: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue : 0
  },
}, 
{
  sequelize, // We need to pass the connection instance
  modelName: 'map_teacher_students', // We need to choose the model name
  timestamps: false,
});

export default MapTeacherStudent;