"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _path = require("path");

var _fs = _interopRequireDefault(require("fs"));

var _CreateConnection = _interopRequireDefault(require("../CreateConnection/CreateConnection"));

var _CreateDatabase = _interopRequireDefault(require("./CreateDatabase"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var InitializeDatabase = function InitializeDatabase() {
  // Crea la promesa para inicializar la base datos
  return new Promise(function (resolve, reject) {
    (0, _CreateDatabase["default"])().then(function () {
      //Se crea el string de la query con el archivo InitDB.sql y el objeto de a conexion
      var mysqlQueryInit = _fs["default"].readFileSync((0, _path.join)(__dirname, '../../ServerFiles/InitDB.sql'), "utf8"),
          mysqlDefault = _fs["default"].readFileSync((0, _path.join)(__dirname, '../../ServerFiles/DefaultUser.sql'), "utf8"),
          connection = _CreateConnection["default"];

      connection.query(mysqlQueryInit, function (error, results, fields) {
        console.log('Verificando Base de datos...'); // Devuelve error si encuentra alguno

        if (error) {
          reject(error);
          return null;
        }

        connection.query("select count(*) as count from usuarios", function (error, results, fields) {
          // Devuelve error si encuentra alguno
          if (error) {
            reject(error);
            return null;
          }

          if (results[0].count == 0) {
            connection.query(mysqlDefault, function (error, results, fields) {
              console.log("Creando usuarios predefinidos..."); // Devuelve error si encuentra alguno

              if (error) {
                reject(error);
                return null;
              }

              resolve(results);
            });
            console.log("Completado!");
          } else {
            resolve(results);
          }
        });
      });
    })["catch"](function (error) {
      throw error;
    });
  });
};

var _default = InitializeDatabase;
exports["default"] = _default;
//# sourceMappingURL=InitializeDatabase.js.map