const { DataTypes, Model } = require('sequelize');

import sequelize from '../config/database';
// import Logger from '../config/logger';
// const LOG = new Logger('subjects.js');

class Subjects extends Model { }

Subjects.init({
  subject_code: {
    type: DataTypes.STRING,
    allowNull: false,
    primaryKey: true
  },
  subject_name: {
    type: DataTypes.STRING,
    allowNull: false
  },
}, 
{
  sequelize, // We need to pass the connection instance
  modelName: 'subjects', // We need to choose the model name
  timestamps: false,
});

export default Subjects;