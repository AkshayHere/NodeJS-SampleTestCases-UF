import Express from 'express';
import { OK } from 'http-status-codes';

import Logger from '../config/logger';
const LOG = new Logger('DataImportController.js');

import Teachers from '../modals/teachers';
import Subjects from '../modals/subjects';

// Mapping Table
import MappingTable from '../modals/mappingTable';

const ExportWorkloadController = Express.Router();

// Each Teacher will teach only one subject
const exportWorkloadController = async (req, res) => {
  var allTeachers = await Teachers.findAll({});
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
    let allSubjects = await MappingTable.findAll({
      where: {
        teacher_email: teacherEmail,
        to_delete: 1
      },
      attributes: ['subject_code']
    });

    // Loop through all subjects
    for (let j = 0; j < allSubjects.length; j++) {
      let subCode = allSubjects[j]['subject_code'];

      // get subject details
      var subjectDetails = await Subjects.findOne({
        where: {
          subject_code: subCode
        }
      });

      outObject[teacherName]['subjectCode'] = subjectDetails['subject_code'];
      outObject[teacherName]['subjectName'] = subjectDetails['subject_name'];

      // Get Class Count by subject
      let classCount = await MappingTable.count({
        where: {
          teacher_email: teacherEmail,
          subject_code: subCode,
          to_delete: 1
        }
      });
      outObject[teacherName]['numberOfClasses'] = classCount;

      LOG.info(JSON.stringify(outObject, null, 2));
      // array push
      worloadOutput.push(outObject);
    }
  }
  LOG.info(JSON.stringify(worloadOutput, null, 2));

  return res.end(JSON.stringify(worloadOutput, null, 2));
}

ExportWorkloadController.get('/reports/workload', exportWorkloadController);

export default ExportWorkloadController;
