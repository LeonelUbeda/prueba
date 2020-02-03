"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _path = require("path");

var _fs = _interopRequireDefault(require("fs"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var GetSchema = function GetSchema() {
  if (process.hasOwnProperty('schema')) {
    return process.schema;
  } else {
    var readSchema = JSON.parse(_fs["default"].readFileSync((0, _path.join)(__dirname, '../../ServerFiles/Schema.json')));
    process.schema = readSchema;
    return process.schema;
  }
};

var _default = GetSchema;
exports["default"] = _default;
//# sourceMappingURL=GetSchema.js.map