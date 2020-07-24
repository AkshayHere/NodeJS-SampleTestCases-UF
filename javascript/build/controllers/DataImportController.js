"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _express = _interopRequireDefault(require("express"));

var _httpStatusCodes = require("http-status-codes");

var _logger = _interopRequireDefault(require("../config/logger"));

var _multer = _interopRequireDefault(require("../config/multer"));

var _utils = require("../utils");

var _teachers = _interopRequireDefault(require("../modals/teachers"));

var _students = _interopRequireDefault(require("../modals/students"));

var _classes = _interopRequireDefault(require("../modals/classes"));

var _subjects = _interopRequireDefault(require("../modals/subjects"));

var DataImportController = _express["default"].Router();

var LOG = new _logger["default"]('DataImportController.js'); // TODO: Please implement Question 1 requirement here

var dataImportHandler = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res, next) {
    var file, data, teachers, students, subjects, classes, i, teacher, isTeacherExists, jane;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            file = req.file;
            _context2.prev = 1;
            _context2.next = 4;
            return (0, _utils.convertCsvToJson)(file.path);

          case 4:
            data = _context2.sent;
            // LOG.info(JSON.stringify(data, null, 2));
            teachers = [];
            students = [];
            subjects = [];
            classes = [];
            data.forEach(function (file) {
              // LOG.info(JSON.stringify(file, null, 2));
              // LOG.info('classname' in file);
              // LOG.info(file['classname']);
              // Create an array of teachers,students, subject & classes
              // array contains key value pair of id & name
              // Check if all the object properties exists
              if ('teacherEmail' in file && 'teacherName' in file && 'studentEmail' in file && 'studentName' in file && 'classCode' in file && 'classname' in file && 'subjectCode' in file && 'subjectName' in file && 'toDelete' in file) {
                // Create Object & Insert
                // Teacher Array
                var teacherEmail = file['teacherEmail'];
                var existingTeacher = teachers.find(function (f) {
                  return f.teacher_email == teacherEmail;
                });

                if (existingTeacher) {
                  existingTeacher['teacher_name'] = file['teacherName'];
                } else {
                  var teacherObject = {};
                  teacherObject['teacher_email'] = teacherEmail;
                  teacherObject['teacher_name'] = file['teacherName'];
                  teachers.push(teacherObject);
                } // Student Array


                var studentEmail = file['studentEmail'];
                var existingStudent = students.find(function (f) {
                  return f.student_email == studentEmail;
                });

                if (existingStudent) {
                  existingStudent['student_name'] = file['studentName'];
                } else {
                  var studentObject = {};
                  studentObject['student_email'] = studentEmail;
                  studentObject['student_name'] = file['studentName'];
                  students.push(studentObject);
                } // Class Array


                var classCode = file['classCode'];
                var existingClass = classes.find(function (f) {
                  return f.class_code == classCode;
                });

                if (existingClass) {
                  existingClass['class_name'] = file['classname'];
                } else {
                  var classObject = {};
                  classObject['class_code'] = classCode;
                  classObject['class_name'] = file['classname'];
                  classes.push(classObject);
                } // Subject Array


                var subjectCode = file['subjectCode'];
                var existingSubject = subjects.find(function (f) {
                  return f.subject_code == subjectCode;
                });

                if (existingSubject) {
                  existingSubject['subject_code'] = file['subjectCode'];
                } else {
                  var subjectObject = {};
                  subjectObject['subject_code'] = subjectCode;
                  subjectObject['subject_name'] = file['subjectName'];
                  subjects.push(subjectObject);
                } // Teacher | Student | To Delete Table
                // To check if the teacher is still teaching this student or not
                // Class | Teacher | Subject Table
                // Check if the Class already has this subject there
                // If not have, insert Teacher Details here | else dont do anything

              } else {
                return res.sendStatus(_httpStatusCodes.BAD_REQUEST);
              }
            });
            LOG.info(JSON.stringify(teachers, null, 2));
            LOG.info(JSON.stringify(students, null, 2));
            LOG.info(JSON.stringify(classes, null, 2));
            LOG.info(JSON.stringify(subjects, null, 2)); // insert teachers

            i = 0;

          case 15:
            if (!(i < teachers.length)) {
              _context2.next = 26;
              break;
            }

            teacher = teachers[i];
            isTeacherExists = _teachers["default"].findAll({
              where: {
                teacher_email: teacher['teacher_email']
              }
            });

            if (isTeacherExists) {
              _context2.next = 23;
              break;
            }

            _context2.next = 21;
            return _teachers["default"].create(teacher);

          case 21:
            jane = _context2.sent;
            LOG.info(JSON.stringify(jane, null, 2));

          case 23:
            i++;
            _context2.next = 15;
            break;

          case 26:
            // Do an insert on respective tables 
            (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
              var users;
              return _regenerator["default"].wrap(function _callee$(_context) {
                while (1) {
                  switch (_context.prev = _context.next) {
                    case 0:
                      _context.next = 2;
                      return _teachers["default"].findAll({
                        where: {
                          teacher_name: 'test'
                        }
                      });

                    case 2:
                      users = _context.sent;
                      LOG.info(JSON.stringify(users, null, 2));

                    case 4:
                    case "end":
                      return _context.stop();
                  }
                }
              }, _callee);
            }))();
            _context2.next = 33;
            break;

          case 29:
            _context2.prev = 29;
            _context2.t0 = _context2["catch"](1);
            LOG.error(_context2.t0);
            return _context2.abrupt("return", next(_context2.t0));

          case 33:
            return _context2.abrupt("return", res.sendStatus(_httpStatusCodes.NO_CONTENT));

          case 34:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[1, 29]]);
  }));

  return function dataImportHandler(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

DataImportController.post('/upload', _multer["default"].single('data'), dataImportHandler);
var _default = DataImportController;
exports["default"] = _default;