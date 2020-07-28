import Express from 'express';
import { NO_CONTENT } from 'http-status-codes';
import Logger from '../config/logger';
import upload from '../config/multer';
import { convertCsvToJson } from '../utils';

import DBService from '../services/DBService';

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
    var studentClassArray = [];
    var teacherClassArray = [];
    var teacherStudentArray = [];

    // return res.end(DBService.staticMethod());

    data.forEach(file => {
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

        // Student Class Mapping
        let studentClassMap = studentClassArray.find(f => f.class_code == classCode && f.student_email == studentEmail);
        if (!studentClassMap) {
          let obj = {};
          obj['class_code'] = classCode;
          obj['student_email'] = studentEmail;
          studentClassArray.push(obj);
        }

        // Teacher Class Mapping
        let teacherClassMap = teacherClassArray.find(f => f.class_code == classCode && f.subject_code == subjectCode);
        if (!teacherClassMap) {
          let obj = {};
          obj['class_code'] = classCode;
          obj['teacher_email'] = teacherEmail;
          obj['subject_code'] = subjectCode;
          teacherClassArray.push(obj);
        }

        // Teacher Student Mapping
        let teacherStudentMap = teacherStudentArray.find(f => f.teacher_email == teacherEmail && f.student_email == studentEmail);
        if (!teacherStudentMap) {
          let obj = {};
          obj['teacher_email'] = teacherEmail;
          obj['student_email'] = studentEmail;
          obj['to_delete'] = file['toDelete'] == 1 ? 1 : 0;
          teacherStudentArray.push(obj);
        }
      } else {
        return res.send({ 'message': 'Missing columns in excel sheet. fields include teacherEmail, teacherName, studentEmail, studentName, classCode, classname, subjectCode, subjectName,toDelete'});
        // return res.sendStatus(BAD_REQUEST);
      }
    });

    // LOG.info(JSON.stringify(teachers, null, 2));
    // LOG.info(JSON.stringify(students, null, 2));
    // LOG.info(JSON.stringify(classes, null, 2));
    // LOG.info(JSON.stringify(subjects, null, 2));
    // LOG.info(JSON.stringify(studentClassArray, null, 2));
    // LOG.info(JSON.stringify(teacherStudentArray, null, 2));
    // LOG.info(JSON.stringify(teacherClassArray, null, 2));

    // insert teachers
    for (let i = 0; i < teachers.length; i++) {
      const teacher = teachers[i];
      let teacherName = teacher['teacher_name'];
      let teacherEmail = teacher['teacher_email'];

      var isTeacherExists = await DBService.getTeacherCountByEmail(teacherEmail);
      LOG.info(isTeacherExists);      

      if(!isTeacherExists){
        await DBService.insertTeacher(teacher);
      } else {
        await DBService.updateTeacherNameByEmail(teacherName, teacherEmail);
      }
    }

    // insert students
    for (let i = 0; i < students.length; i++) {
      const student = students[i];
      let studentName = student['student_name'];
      let studentEmail = student['student_email'];
      
      var isStudentExists = await DBService.getStudentCountByEmail(studentEmail);
      LOG.info(isStudentExists);

      if(!isStudentExists){
        await DBService.insertStudent(student);
      } else {
        await  DBService.updateStudentNameByEmail(studentName, studentEmail);
      }
    }

    // insert classes
    for (let i = 0; i < classes.length; i++) {
      const clss = classes[i];
      let className = clss['class_name'];
      let classCode = clss['class_code'];
      
      var isClassExists = await DBService.getClassCountByCode(classCode);
      // LOG.info(isClassExists);

      if(!isClassExists){
        await DBService.insertClass(clss);
      } else {
        await DBService.updateClassNameByCode(className, classCode);
      }
    }

    // insert subjects
    for (let i = 0; i < subjects.length; i++) {
      const subject = subjects[i];
      let subjectName = subject['subject_name'];
      let subjectCode = subject['subject_code'];
      
      var isSubjectExists = await DBService.getSubjectCountByCode(subjectCode);
      // LOG.info(isSubjectExists);

      if(!isSubjectExists){
        await DBService.insertSubject(subject);
      } else {
        await DBService.updateSubjectNameByCode(subjectName, subjectCode);
      }
    }

    // Student Class Table
    for (let i = 0; i < studentClassArray.length; i++) {
      let studentClassObj = studentClassArray[i];
      let classCode = studentClassObj['class_code'];
      let studentEmail = studentClassObj['student_email'];
      
      let isExists = await DBService.checkIfStudentClassExists(classCode, studentEmail);
      // LOG.info(isExists);

      if(!isExists){
        await DBService.insertStudentClassTable(studentClassObj);
      }
    }

    // Teacher Class Table
    for (let i = 0; i < teacherClassArray.length; i++) {
      let teacherClassObj = teacherClassArray[i];
      let classCode = teacherClassObj['class_code'];
      let teacherEmail = teacherClassObj['teacher_email'];
      let subjectCode = teacherClassObj['subject_code'];
      
      let isExists = await DBService.checkIfTeacherClassExists(teacherEmail, classCode, subjectCode);
      // LOG.info(isExists);

      if(!isExists){
        await DBService.insertTeacherClassTable(teacherClassObj);
      }
    }

    // Teacher Student Array
    for (let i = 0; i < teacherStudentArray.length; i++) {
      let teacherStudentObj = teacherStudentArray[i];
      let teacherEmail = teacherStudentObj['teacher_email'];
      let studentEmail = teacherStudentObj['student_email'];
      let toDelete = teacherStudentObj['to_delete'];
      
      let isExists = await DBService.checkIfTeacherStudentExists(teacherEmail, studentEmail, toDelete);
      // LOG.info(isExists);

      if(!isExists){
        await DBService.insertTeacherStudentTable(teacherStudentObj);
      }
    }
  } 
  catch (err) {
    LOG.error(err)
    return next(err);
  }

  return res.sendStatus(NO_CONTENT);
}

DataImportController.post('/upload', upload.single('data'), dataImportHandler);

export default DataImportController;
