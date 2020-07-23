"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _DataImportController = _interopRequireDefault(require("./controllers/DataImportController"));

var _HealthcheckController = _interopRequireDefault(require("./controllers/HealthcheckController"));

var router = _express["default"].Router();

router.use('/', _DataImportController["default"]);
router.use('/', _HealthcheckController["default"]);
var _default = router;
exports["default"] = _default;