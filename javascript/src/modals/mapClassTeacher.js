const { DataTypes, Model } = require('sequelize');

import sequelize from '../config/database';
// import Logger from '../config/logger';
// const LOG = new Logger('mapClassTeacher.js');

class MapClassTeacher extends Model { }

MapClassTeacher.init({
  class_code: {
    type: DataTypes.STRING,
    allowNull: false
  },
  teacher_email: {
    type: DataTypes.STRING,
    allowNull: false
  },
}, 
{
  sequelize, // We need to pass the connection instance
  modelName: 'map_class_teachers', // We need to choose the model name
  timestamps: false,
});

export default MapClassTeacher;