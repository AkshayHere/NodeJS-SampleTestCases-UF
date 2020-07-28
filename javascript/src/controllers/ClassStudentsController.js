import Express from 'express';
// import { BAD_REQUEST } from 'http-status-codes';
import axios from 'axios';
import DBService from '../services/DBService';
import HelperService from '../services/helperService';

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

  if (offset == '' || limit == '' || classCode == '') {
    return res.send({ 'message': 'Must provide class (string) as url param. Provide offset (integer) and limit (integer) as part of query param.' });
  }

  // Firstly get the list of all students who are under the external list
  try {
    // LOG.info(process.env.EXTERNAL_API_URL);
    const response = await axios.get(process.env.EXTERNAL_API_URL + 'students?class=' + classCode + '&offset=' + offset + '&limit=' + limit);

    if ('data' in response && response.data) {

      // Get all student emails by class code
      var studentEmails = await DBService.getAllStudentEmailsByClassCode(classCode);
      // LOG.info(JSON.stringify(studentEmails));
      var studentEmailsCount = studentEmails.length;
      // LOG.info('studentEmailsCount : ' + studentEmailsCount);

      // Process api response
      var externalStudentDetails = 'students' in response.data && response.data.students;
      var externalStudentCount = 'count' in response.data && response.data.count;

      // remove id from response data
      externalStudentDetails.forEach(function (v) { delete v.id });

      // Extract internal student details & include in the table
      for (let i = 0; i < studentEmails.length; i++) {
        let studentEmail = studentEmails[i]['student_email'];
        let studentDetails = await DBService.getStudentDetailsByEmail(studentEmail);
        // LOG.info(JSON.stringify(studentDetails));

        // Create an object & insert to existing array
        let insertObject = {};
        insertObject['email'] = studentEmail;
        insertObject['name'] = studentDetails['student_name'];
        externalStudentDetails.push(insertObject);
      }

      // Sorted Array By Property Value
      externalStudentDetails = HelperService.sortArrayByProperty(externalStudentDetails, 'email');
      var totalCount = externalStudentCount + studentEmailsCount;
      // LOG.info('totalCount : '+totalCount);      

      // Take the first n items based on limit provided
      externalStudentDetails = externalStudentDetails.slice(0, limit);
      // LOG.info('externalStudentDetails : '+externalStudentDetails.length);

      // Construct output response
      var outputResponse = {};
      outputResponse['count'] = totalCount;
      outputResponse['students'] = externalStudentDetails;

      return res.send(outputResponse);
    }
  } catch (error) {
    return res.end(JSON.stringify(error));
  }
}

ClassStudentsController.get('/class/:classCode/students', classStudentsController);

export default ClassStudentsController;
