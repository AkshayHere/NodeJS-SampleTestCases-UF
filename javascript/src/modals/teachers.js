const { DataTypes, Model } = require('sequelize');

import sequelize from '../config/database';
import Logger from '../config/logger';
const LOG = new Logger('teachers.js');

class Teachers extends Model { }

try {
  LOG.info(JSON.stringify(sequelize.authenticate(), null, 2));
  LOG.info('Connection has been established successfully.');
} catch (error) {
  LOG.info(JSON.stringify(error, null, 2));
  LOG.info('Unable to connect to the database:', error);
}

Teachers.init({
  teacher_email: {
    type: DataTypes.STRING,
    allowNull: false,
    primaryKey: true
  },
  teacher_name: {
    type: DataTypes.STRING,
    allowNull: false
  },
}, 
{
  sequelize, // We need to pass the connection instance
  modelName: 'teachers', // We need to choose the model name
  timestamps: false,
});

export default Teachers;