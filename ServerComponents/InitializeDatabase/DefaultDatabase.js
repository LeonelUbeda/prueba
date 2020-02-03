"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _path = require("path");

var _fs = _interopRequireDefault(require("fs"));

var _CreateConnection = _interopRequireDefault(require("../CreateConnection/CreateConnection"));

var _ResetDatabase = _interopRequireDefault(require("./ResetDatabase"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var DefaultDatabase = function DefaultDatabase() {
  // Crea la promesa para inicializar la base datos
  return new Promise(function (resolve, reject) {
    var mysqlQueryDefault = _fs["default"].readFileSync((0, _path.join)(__dirname, '../../ServerFiles/DefaultValues.sql'), "utf8"),
        connection = _CreateConnection["default"];

    (0, _ResetDatabase["default"])().then(function () {
      connection.query(mysqlQueryDefault, function (error, results, fields) {
        // Devuelve el error si encuentra alguno
        if (error) {
          reject(error);
          return null;
        }

        resolve();
      });
    })["catch"](function () {
      return reject();
    }); // De lo contrario, procede a la segunda query
  });
};

var _default = DefaultDatabase;
exports["default"] = _default;
//# sourceMappingURL=DefaultDatabase.js.map