import Express from 'express';
import { BAD_REQUEST } from 'http-status-codes';
import axios from 'axios';

// import Logger from '../config/logger';
// const LOG = new Logger('ClassStudentsController.js');

const ClassStudentsController = Express.Router();

const classStudentsController = async (req, res) => {
  // LOG.info(JSON.stringify(req.query, null, 2));
  // LOG.info(JSON.stringify(req.params, null, 2));

  // Do validations here
  let offset = 'offset' in req.query && req.query.offset ? req.query.offset : '';
  let limit = 'limit' in req.query && req.query.limit ? req.query.limit : '';
  let classCode = 'classCode' in req.params && req.params.classCode ? req.params.classCode : '';

  if(offset == '' || limit == '' || classCode == ''){
    return res.sendStatus(BAD_REQUEST);
  }

  // Firstly get the list of all students who are under the external list
  try {
    // LOG.info(process.env.EXTERNAL_API_URL);
    const response = await axios.get(process.env.EXTERNAL_API_URL+'students?class='+classCode+'&offset='+offset+'&limit='+limit);
    return res.end(JSON.stringify(response.data));
  } catch (error) {
    return res.end(JSON.stringify(error));
  }
}

ClassStudentsController.get('/class/:classCode/students', classStudentsController);

export default ClassStudentsController;
