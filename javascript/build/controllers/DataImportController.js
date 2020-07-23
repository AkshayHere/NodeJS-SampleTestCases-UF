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

var DataImportController = _express["default"].Router();

var LOG = new _logger["default"]('DataImportController.js'); // TODO: Please implement Question 1 requirement here

var dataImportHandler = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res, next) {
    var file, data;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            file = req.file;
            _context.prev = 1;
            _context.next = 4;
            return (0, _utils.convertCsvToJson)(file.path);

          case 4:
            data = _context.sent;
            LOG.info(JSON.stringify(data, null, 2)); // Check for the assusmptions heres

            _context.next = 12;
            break;

          case 8:
            _context.prev = 8;
            _context.t0 = _context["catch"](1);
            LOG.error(_context.t0);
            return _context.abrupt("return", next(_context.t0));

          case 12:
            return _context.abrupt("return", res.sendStatus(_httpStatusCodes.NO_CONTENT));

          case 13:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[1, 8]]);
  }));

  return function dataImportHandler(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

DataImportController.post('/upload', _multer["default"].single('data'), dataImportHandler);
var _default = DataImportController;
exports["default"] = _default;