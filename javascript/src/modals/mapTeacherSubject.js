const { DataTypes, Model } = require('sequelize');

import sequelize from '../config/database';
// import Logger from '../config/logger';
// const LOG = new Logger('mapTeacherSubject.js');

class MapTeacherSubject extends Model { }

MapTeacherSubject.init({
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
  modelName: 'map_teacher_subjects', // We need to choose the model name
  timestamps: false,
});

export default MapTeacherSubject;