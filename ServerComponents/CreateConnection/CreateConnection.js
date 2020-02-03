"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mysql = require("mysql");

var _path = require("path");

var _fs = _interopRequireDefault(require("fs"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// Utiliza crea un objeto de conexion utilizando las credenciales de la base de datos
console.log('Estableciendo conexión con la base de datos...');
var credentials = JSON.parse(_fs["default"].readFileSync((0, _path.join)(__dirname, '../../ServerFiles/dbCredentials.json')));
process.db = credentials;
var connection = (0, _mysql.createPool)(credentials);
var _default = connection;
exports["default"] = _default;
//# sourceMappingURL=CreateConnection.js.map