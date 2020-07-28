import Express from 'express';
// import { OK } from 'http-status-codes';

import Logger from '../config/logger';
const LOG = new Logger('DataImportController.js');

import DBService from '../services/DBService';

const ExportWorkloadController = Express.Router();

// Each Teacher will teach only one subject
const exportWorkloadController = async (req, res) => {
  var allTeachers = await DBService.getAllTeachers();
  LOG.info(JSON.stringify(allTeachers, null, 2));  

  var worloadOutput = [];

  // Get all teachers list
  for (let i = 0; i < allTeachers.length; i++) {
    let teacherName = allTeachers[i]['teacher_name'];
    let teacherEmail = allTeachers[i]['teacher_email'];

    // Creating a return object
    var outObject = {};
    outObject[teacherName] = {};

    // Get all subjects based on teacher & enabled
    let allSubjects = await DBService.getSubjectsByTeacherEmail(teacherEmail);
    // return res.send(allSubjects);

    // Loop through all subjects
    for (let j = 0; j < allSubjects.length; j++) {
      let subjectCode = allSubjects[j]['subject_code'];

      // get subject details
      var subjectDetails = await DBService.getSubjectDetails(subjectCode);
      outObject[teacherName]['subjectCode'] = subjectDetails['subject_code'];
      outObject[teacherName]['subjectName'] = subjectDetails['subject_name'];

      // Get Class Count by subject
      let classCount = await DBService.getClassCountBySubjectCodeAndTeacherEmail(subjectCode, teacherEmail);
      outObject[teacherName]['numberOfClasses'] = classCount;

      // LOG.info(JSON.stringify(outObject, null, 2));
      // array push
      worloadOutput.push(outObject);
    }
  }
  LOG.info(JSON.stringify(worloadOutput, null, 2));

  return res.send(worloadOutput);
}

ExportWorkloadController.get('/reports/workload', exportWorkloadController);

export default ExportWorkloadController;
