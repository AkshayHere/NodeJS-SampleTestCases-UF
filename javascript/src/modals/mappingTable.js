const { DataTypes, Model } = require('sequelize');

import sequelize from '../config/database';
// import Logger from '../config/logger';
// const LOG = new Logger('mappingTable.js');

class MappingTable extends Model { }

MappingTable.init({
  class_code: {
    type: DataTypes.STRING,
    allowNull: false
  },
  teacher_email: {
    type: DataTypes.STRING,
    allowNull: false
  },
  student_email: {
    type: DataTypes.STRING,
    allowNull: false
  },
  subject_code: {
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
  modelName: 'mappingTables', // We need to choose the model name
  timestamps: false,
});

export default MappingTable;