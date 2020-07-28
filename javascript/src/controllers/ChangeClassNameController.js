import Express from 'express';
import { NO_CONTENT } from 'http-status-codes';

import DBService from '../services/DBService';

// import Logger from '../config/logger';
// const LOG = new Logger('ChangeClassNameController.js');

const ChangeClassNameController = Express.Router();

const changeClassNameController = async (req, res) => {
  
  const { className } = req.body;
  let classCode = 'classCode' in req.params && req.params.classCode ? req.params.classCode : '';
  
  // Check if className & classCode is passed 
  if(!className || !classCode){
    return res.send({ 'message': 'Must provide className (string) and classCode to change classname.' });
  }

  var isClassExists = await DBService.getClassCountByCode(classCode);

  if(!isClassExists){
    return res.send({ 'message': 'class don\'t exists.' });
  } else {
    await DBService.updateClassNameByCode(className, classCode);
  }

  return res.sendStatus(NO_CONTENT);
}

ChangeClassNameController.put('/class/:classCode', changeClassNameController);

export default ChangeClassNameController;
