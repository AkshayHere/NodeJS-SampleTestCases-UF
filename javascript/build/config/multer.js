"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _multer = _interopRequireDefault(require("multer"));

var diskStorage = _multer["default"].diskStorage({
  destination: '/tmp/school-administration-system-uploads',
  filename: function filename(req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now());
  }
});

var upload = (0, _multer["default"])({
  storage: diskStorage
});
var _default = upload;
exports["default"] = _default;