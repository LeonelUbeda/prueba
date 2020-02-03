"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _SchemaQuery = _interopRequireDefault(require("./SchemaQuery"));

var _fs = _interopRequireWildcard(require("fs"));

var _path = _interopRequireDefault(require("path"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var updateTime = 300000;

var HandleSchema = function HandleSchema() {
  return new Promise(function (resolve, reject) {
    if (process.hasOwnProperty('schema')) {
      if (process.schema.lastUpdate + updateTime < Date.now()) {
        resolve(process.schema);
      } else {
        (0, _SchemaQuery["default"])().then(function (schema) {
          process.schema = schema;
          resolve(process.schema);
        });
      }
    } else {
      try {
        var schemaRaw = (0, _fs.readFileSync)(_path["default"].join(__dirname, '../../ServerFiles/Schema.json'), 'utf8'),
            schema = JSON.parse(schemaRaw);

        if (schema.lastUpdate + updateTime < Date.now()) {
          (0, _SchemaQuery["default"])().then(function (schema) {
            process.schema = schema;
            resolve(process.schema);
          });
        } else {
          process.schema = schema;
          resolve(schema);
        }
      } catch (err) {
        (0, _SchemaQuery["default"])().then(function (schema) {
          process.schema = schema;
          resolve(process.schema);
        });
      }
    }
  });
};

var _default = HandleSchema;
exports["default"] = _default;
//# sourceMappingURL=HandleSchema.js.map