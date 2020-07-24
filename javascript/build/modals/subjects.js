"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _database = _interopRequireDefault(require("../config/database"));

var _logger = _interopRequireDefault(require("../config/logger"));

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

var _require = require('sequelize'),
    DataTypes = _require.DataTypes,
    Model = _require.Model;

var LOG = new _logger["default"]('subjects.js');

var Subjects = /*#__PURE__*/function (_Model) {
  (0, _inherits2["default"])(Subjects, _Model);

  var _super = _createSuper(Subjects);

  function Subjects() {
    (0, _classCallCheck2["default"])(this, Subjects);
    return _super.apply(this, arguments);
  }

  return Subjects;
}(Model); // helps to check if connecting or not


try {
  LOG.info(JSON.stringify(_database["default"].authenticate(), null, 2));
  LOG.info('Connection has been established successfully.');
} catch (error) {
  LOG.info(JSON.stringify(error, null, 2));
  LOG.info('Unable to connect to the database:', error);
}

Subjects.init({
  subject_code: {
    type: DataTypes.STRING,
    allowNull: false,
    primaryKey: true
  },
  subject_name: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  sequelize: _database["default"],
  // We need to pass the connection instance
  modelName: 'subjects',
  // We need to choose the model name
  timestamps: false
});
var _default = Subjects;
exports["default"] = _default;