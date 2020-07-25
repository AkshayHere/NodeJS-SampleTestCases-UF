import Express from 'express';
import { NO_CONTENT, BAD_REQUEST, INTERNAL_SERVER_ERROR } from 'http-status-codes';

import Classes from '../modals/classes';

// import Logger from '../config/logger';
// const LOG = new Logger('ChangeClassNameController.js');

const ChangeClassNameController = Express.Router();

const changeClassNameController = async (req, res) => {
  const { className } = req.body;

  let classCode = 'classCode' in req.params && req.params.classCode ? req.params.classCode : '';
  // Check if className & classCode is passed 
  if(!className || !classCode){
    return res.sendStatus(BAD_REQUEST);
  }

  var isClassExists = await Classes.count({
    where: {
      class_code: classCode
    }
  });
  // LOG.info(isClassExists);

  if(!isClassExists){
    return res.sendStatus(INTERNAL_SERVER_ERROR);
  } else {
    await Classes.update({ class_name: className }, {
      where: {
        class_code: classCode
      }
    });
  }

  return res.sendStatus(NO_CONTENT);
}

ChangeClassNameController.put('/class/:classCode', changeClassNameController);

export default ChangeClassNameController;
