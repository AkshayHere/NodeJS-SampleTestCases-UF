import Express from 'express';
import { NO_CONTENT, BAD_REQUEST } from 'http-status-codes';
import Logger from '../config/logger';
import upload from '../config/multer';
import { convertCsvToJson } from '../utils';

import Teachers from '../modals/teachers';
import Students from '../modals/students';
import Classes from '../modals/classes';
import Subjects from '../modals/subjects';

// Mapping Table
import MapTeacherStudent from '../modals/mapTeacherStudent';
import MapTeacherSubject from '../modals/mapTeacherSubject';
import MapClassTeacher from '../modals/mapClassTeacher';

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
    var mapTeacherStudents = [];
    var mapTeacherSubjects = [];
    var mapClassTeachers = [];

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

        // Teacher | Student | To Delete Table
        let existingMapOne = mapTeacherStudents.find(f => f.teacher_email == teacherEmail && f.student_email == studentEmail);
        if (!existingMapOne) {
          var obj1 = {};
          obj1['teacher_email'] = teacherEmail;
          obj1['student_email'] = studentEmail;
          obj1['to_delete'] = file['toDelete'] == 1 ? 1 : 0;
          mapTeacherStudents.push(obj1);
        }

        // Teacher | Subject Table
        let existingMapTwo = mapTeacherSubjects.find(f => f.teacher_email == teacherEmail && f.subject_code == subjectCode);
        if (!existingMapTwo) {
          var obj2 = {};
          obj2['teacher_email'] = teacherEmail;
          obj2['subject_code'] = subjectCode;
          mapTeacherSubjects.push(obj2);
        }

        // Class | Teacher Table
        let existingMapThree = mapClassTeachers.find(f => f.teacher_email == teacherEmail && f.class_code == classCode);
        if (!existingMapThree) {
          var obj3 = {};
          obj3['class_code'] = classCode;
          obj3['teacher_email'] = teacherEmail;
          mapClassTeachers.push(obj3);
        }

      } else {
        return res.sendStatus(BAD_REQUEST);
      }
    });

    // LOG.info(JSON.stringify(teachers, null, 2));
    // LOG.info(JSON.stringify(students, null, 2));
    // LOG.info(JSON.stringify(classes, null, 2));
    // LOG.info(JSON.stringify(subjects, null, 2));
    // LOG.info(JSON.stringify(mapTeacherStudents, null, 2));
    // LOG.info(JSON.stringify(mapTeacherSubjects, null, 2));
    // LOG.info(JSON.stringify(mapClassTeachers, null, 2));
    // return res.sendStatus(NO_CONTENT);

    // insert teachers
    for (let i = 0; i < teachers.length; i++) {
      const teacher = teachers[i];
      
      var isTeacherExists = await Teachers.count({
        where: {
          teacher_email: teacher['teacher_email']
        }
      });
      LOG.info(isTeacherExists);

      if(!isTeacherExists){
        await Teachers.create(teacher);
      } else {
        await Teachers.update({ teacher_name: teacher['teacher_name'] }, {
          where: {
            teacher_email: teacher['teacher_email']
          }
        });
      }
    }

    // insert students
    for (let i = 0; i < students.length; i++) {
      const student = students[i];
      
      var isStudentExists = await Students.count({
        where: {
          student_email: student['student_email']
        }
      });
      LOG.info(isStudentExists);

      if(!isStudentExists){
        await Students.create(student);
      } else {
        await Students.update({ student_name: student['student_name'] }, {
          where: {
            student_email: student['student_email']
          }
        });
      }
    }

    // insert classes
    for (let i = 0; i < classes.length; i++) {
      const clss = classes[i];
      
      var isClassExists = await Classes.count({
        where: {
          class_code: clss['class_code']
        }
      });
      // LOG.info(isClassExists);

      if(!isClassExists){
        await Classes.create(clss);
      } else {
        await Classes.update({ class_name: clss['class_name'] }, {
          where: {
            class_code: clss['class_code']
          }
        });
      }
    }

    // insert subjects
    for (let i = 0; i < subjects.length; i++) {
      const subject = subjects[i];
      
      var isSubjectExists = await Subjects.count({
        where: {
          subject_code: subject['subject_code']
        }
      });
      // LOG.info(isSubjectExists);

      if(!isSubjectExists){
        await Subjects.create(subject);
      } else {
        await Subjects.update({ subject_name: subject['subject_name'] }, {
          where: {
            subject_code: subject['subject_code']
          }
        });
      }
    }

    // insert mapping tables
    for (let i = 0; i < mapTeacherStudents.length; i++) {
      const mapOne = mapTeacherStudents[i];
      
      var isMapOneExists = await MapTeacherStudent.count({
        where: {
          teacher_email: mapOne['teacher_email'],
          student_email: mapOne['student_email'],
        }
      });
      // LOG.info(isMapOneExists);

      if(!isMapOneExists){
        await MapTeacherStudent.create(mapOne);
      }
    }

    for (let i = 0; i < mapTeacherSubjects.length; i++) {
      const mapTwo = mapTeacherSubjects[i];
      
      var isMapTwoExists = await MapTeacherSubject.count({
        where: {
          teacher_email: mapTwo['teacher_email'],
          subject_code: mapTwo['subject_code'],
        }
      });
      // LOG.info(isMapTwoExists);

      if(!isMapTwoExists){
        await MapTeacherSubject.create(mapTwo);
      }
    }

    for (let i = 0; i < mapClassTeachers.length; i++) {
      const mapThree = mapClassTeachers[i];
      
      var isMapThreeExists = await MapClassTeacher.count({
        where: {
          teacher_email: mapThree['teacher_email'],
          class_code: mapThree['class_code'],
        }
      });
      // LOG.info(isMapThreeExists);

      if(!isMapThreeExists){
        await MapClassTeacher.create(mapThree);
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
