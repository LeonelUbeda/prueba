"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _path = require("path");

var _fs = _interopRequireDefault(require("fs"));

var _CreateConnection = _interopRequireDefault(require("../CreateConnection/CreateConnection"));

var _InitializeDatabase = _interopRequireDefault(require("./InitializeDatabase"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var ResetDatabase = function ResetDatabase() {
  // Crea la promesa para inicializar la base datos
  return new Promise(function (resolve, reject) {
    var mysqlQueryDrop = _fs["default"].readFileSync((0, _path.join)(__dirname, '../../ServerFiles/DropDB.sql'), "utf8"),
        connection = _CreateConnection["default"];

    console.log("Borrando base de datos..."); // De lo contrario, procede a la segunda query

    connection.query(mysqlQueryDrop, function (error, results, fields) {
      // Devuelve el error si encuentra alguno
      if (error) {
        reject(error);
        return null;
      } else {
        console.log("Borrado completo...");
      }

      (0, _InitializeDatabase["default"])().then(function () {
        return resolve();
      })["catch"](function () {
        return reject();
      });
    });
  });
};

var _default = ResetDatabase;
exports["default"] = _default;
//# sourceMappingURL=ResetDatabase.js.map