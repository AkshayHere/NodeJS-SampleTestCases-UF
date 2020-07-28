import Teachers from '../modals/teachers';
import Students from '../modals/students';
import Classes from '../modals/classes';
import Subjects from '../modals/subjects';
import StudentClassTables from '../modals/studentClassTables';
import TeacherStudentTables from '../modals/teacherStudentTables';
import TeacherClassTables from '../modals/teacherClassTables';

class DBService {
  //============= TEACHER ====================
  // Insert Teacher
  static insertTeacher(teacher) {
    return Teachers.create(teacher);
  }

  // Get Teacher Count By Email
  static getTeacherCountByEmail(teacherEmail) {
    return Teachers.count({
      where: {
        teacher_email: teacherEmail
      }
    });
  }

  // Update Teacher Name By Email
  static updateTeacherNameByEmail(teacherName, teacherEmail) {
    return Teachers.update({ teacher_name: teacherName }, {
      where: {
        teacher_email: teacherEmail
      }
    });
  }

  // Get all teachers
  static getAllTeachers() {
    return Teachers.findAll({});
  }

  //============= END TEACHER ====================

  //============= STUDENT ====================
  // Insert Student
  static insertStudent(student) {
    return Students.create(student);
  }

  // Get Student Count By Email
  static getStudentCountByEmail(studentEmail) {
    return Students.count({
      where: {
        student_email: studentEmail
      }
    });
  }

  // Update Student Name By Email
  static updateStudentNameByEmail(studentName, studentEmail) {
    return Students.update({ student_name: studentName }, {
      where: {
        student_email: studentEmail
      }
    });
  }

  // Get Student Details By Email
  static getStudentDetailsByEmail(studentEmail) {
    return Students.findOne({
      where: {
        student_email: studentEmail
      }
    });
  }

  //============= END STUDENT ====================

  //============= CLASS ====================
  // Insert Class
  static insertClass(classObj) {
    return Classes.create(classObj);
  }

  // Get Class Count By Code
  static getClassCountByCode(classCode) {
    return Classes.count({
      where: {
        class_code: classCode
      }
    });
  }

  // Update Class Name By Code
  static updateClassNameByCode(className, classCode) {
    return Classes.update({ class_name: className }, {
      where: {
        class_code: classCode
      }
    });
  }
  //============= END CLASS ====================

  //============= SUBJECT ====================
  // Insert subject
  static insertSubject(subject) {
    return Subjects.create(subject);
  }

  // Get subject Count By Code
  static getSubjectCountByCode(subjectCode) {
    return Subjects.count({
      where: {
        subject_code: subjectCode
      }
    });
  }

  // Update subject Name By Code
  static updateSubjectNameByCode(subjectName, subjectCode) {
    return Subjects.update({ subject_name: subjectName }, {
      where: {
        subject_code: subjectCode
      }
    });
  }

  // Get subject details by subject code
  static getSubjectDetails(subjectCode) {
    return Subjects.findOne({
      where: {
        subject_code: subjectCode
      }
    })
  }
  //============= END SUBJECT ====================

  //============= STUDENT CLASS TABLES ====================
  static insertStudentClassTable(obj) {
    return StudentClassTables.create(obj);
  }

  static checkIfStudentClassExists(classCode, studentEmail) {
    return StudentClassTables.count({
      where: {
        class_code: classCode,
        student_email: studentEmail
      }
    });
  }

  // Get all student emails by class code
  static getAllStudentEmailsByClassCode(classCode) {
    return StudentClassTables.findAll({
      where: {
        class_code: classCode
      },
      attributes: ['student_email']
    });
  }
  //============= END ====================

  //============= TEACHER STUDENT TABLES ====================
  static insertTeacherStudentTable(obj) {
    return TeacherStudentTables.create(obj);
  }

  static checkIfTeacherStudentExists(teacherEmail, studentEmail, toDelete) {
    return TeacherStudentTables.count({
      where: {
        teacher_email: teacherEmail,
        student_email: studentEmail,
        to_delete : toDelete
      }
    });
  }
  //============= END ====================

  //============= TEACHER CLASS TABLES ====================
  static insertTeacherClassTable(obj) {
    return TeacherClassTables.create(obj);
  }

  static checkIfTeacherClassExists(teacherEmail, classCode, subjectCode) {
    return TeacherClassTables.count({
      where: {
        class_code: classCode,
        teacher_email: teacherEmail,
        subject_code : subjectCode
      }
    });
  }

  // Get all subjects taught by teacher
  static getSubjectsByTeacherEmail(teacherEmail) {
    return TeacherClassTables.findAll({
      where: {
        teacher_email: teacherEmail
      },
      attributes: ['subject_code']
    });
  }

  // Get class count by subject code & teacher email
  static getClassCountBySubjectCodeAndTeacherEmail(subjectCode, teacherEmail) {
    return TeacherClassTables.count({
      where: {
        teacher_email: teacherEmail,
        subject_code: subjectCode,
      },
      distinct: true,
    });
  }

  //============= END ====================
}

export default DBService;