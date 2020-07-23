"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.convertCsvToJson = void 0;

var _fs = _interopRequireDefault(require("fs"));

var _csvParser = _interopRequireDefault(require("csv-parser"));

var convertCsvToJson = function convertCsvToJson(filePath) {
  var results = [];

  var stream = _fs["default"].createReadStream(filePath).pipe((0, _csvParser["default"])());

  return new Promise(function (resolve, reject) {
    stream.on('data', function (data) {
      return results.push(data);
    });
    stream.on('end', function () {
      return resolve(results);
    });
    stream.on('error', function (err) {
      return reject(err);
    });
  });
};

exports.convertCsvToJson = convertCsvToJson;