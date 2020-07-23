import Express from 'express';
import { NO_CONTENT, BAD_REQUEST } from 'http-status-codes';
import Logger from '../config/logger';
import upload from '../config/multer';
import { convertCsvToJson } from '../utils';

import Teachers from '../modals/teachers';
import Students from '../modals/students';
import Classes from '../modals/classes';
import Subjects from '../modals/subjects';

const DataImportController = Express.Router();
const LOG = new Logger('DataImportController.js');

// TODO: Please implement Question 1 requirement here
const dataImportHandler = async (req, res, next) => {
  const { file } = req;

  try {
    const data = await convertCsvToJson(file.path);
    // LOG.info(JSON.stringify(data, null, 2));

    var teachers = [];
    var students = [];
    var subjects = [];
    var classes = [];

    data.forEach(file => {
      // LOG.info(JSON.stringify(file, null, 2));
      // LOG.info('classname' in file);
      // LOG.info(file['classname']);

      // Create an array of teachers,students, subject & classes
      // array contains key value pair of id & name

      // Check if all the object properties exists
      if ('teacherEmail' in file && 'teacherName' in file && 
            'studentEmail' in file && 'studentName' in file && 
              'classCode' in file && 'classname' in file && 
                'subjectCode' in file && 'subjectName' in file && 
                  'toDelete' in file) {

        // Create Object & Insert
        // Teacher Array
        var teacherEmail = file['teacherEmail'];
        let existingTeacher = teachers.find(f => f.teacher_email == teacherEmail);
        
        if (existingTeacher) {
          existingTeacher['teacher_name'] = file['teacherName'];
        } 
        else {
          var teacherObject = {};
          teacherObject['teacher_email'] = teacherEmail;
          teacherObject['teacher_name'] = file['teacherName'];
          teachers.push(teacherObject);
        }

        // Student Array
        var studentEmail = file['studentEmail'];
        let existingStudent = students.find(f => f.student_email == studentEmail);
        
        if (existingStudent) {
          existingStudent['student_name'] = file['studentName'];
        } 
        else {
          var studentObject = {};
          studentObject['student_email'] = studentEmail;
          studentObject['student_name'] = file['studentName'];
          students.push(studentObject);
        }

        // Class Array
        var classCode = file['classCode'];
        let existingClass = classes.find(f => f.class_code == classCode);
        
        if (existingClass) {
          existingClass['class_name'] = file['classname'];
        } 
        else {
          var classObject = {};
          classObject['class_code'] = classCode;
          classObject['class_name'] = file['classname'];
          classes.push(classObject);
        }

        // Subject Array
        var subjectCode = file['subjectCode'];
        let existingSubject = subjects.find(f => f.subject_code == subjectCode);
        
        if (existingSubject) {
          existingSubject['subject_code'] = file['subjectCode'];
        } 
        else {
          var subjectObject = {};
          subjectObject['subject_code'] = subjectCode;
          subjectObject['subject_name'] = file['subjectName'];
          subjects.push(subjectObject);
        }

        // Teacher | Student | To Delete Table
        // To check if the teacher is still teaching this student or not

        // Class | Teacher | Subject Table
        // Check if the Class already has this subject there
        // If not have, insert Teacher Details here | else dont do anything

      } else {
        return res.sendStatus(BAD_REQUEST);
      }
    });

    LOG.info(JSON.stringify(teachers, null, 2));
    LOG.info(JSON.stringify(students, null, 2));
    LOG.info(JSON.stringify(classes, null, 2));
    LOG.info(JSON.stringify(subjects, null, 2));

    // Do an insert on respective tables 
    (async () => {
      const users = await Teachers.findAll({
        where: {
          teacher_name: 'test'
        }
      });
      LOG.info(JSON.stringify(users, null, 2));
    })();

  } catch (err) {
    LOG.error(err)
    return next(err);
  }

  return res.sendStatus(NO_CONTENT);
}

DataImportController.post('/upload', upload.single('data'), dataImportHandler);

export default DataImportController;
