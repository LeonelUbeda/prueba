"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mysql = _interopRequireDefault(require("mysql"));

var _CreateConnection = _interopRequireDefault(require("../../ServerComponents/CreateConnection/CreateConnection"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var VerificarLogin = function VerificarLogin(usuario, contra) {
  return new Promise(function (resolve, reject) {
    var connection = _CreateConnection["default"];
    var query = "select roles.ID_rol,nombre,user,name, pass,\n    (case productos\n          when 'Ninguno' then 1\n          when 'Leer' then 2\n          when 'Escribir' then 3\n          when 'Actualizar' then 4\n          when 'Eliminar' then 5\n          end) as productos,\n    (case clasificacion\n          when 'Ninguno' then 1\n          when 'Leer' then 2\n          when 'Escribir' then 3\n          when 'Actualizar' then 4\n          when 'Eliminar' then 5\n          end) as clasificacion,\n    (case lotes\n          when 'Ninguno' then 1\n          when 'Leer' then 2\n          when 'Escribir' then 3\n          when 'Actualizar' then 4\n          when 'Eliminar' then 5\n          end) as lotes,\n    (case reportes\n          when 'Ninguno' then 1\n          when 'Leer' then 2\n          when 'Escribir' then 3\n          when 'Actualizar' then 4\n          when 'Eliminar' then 5\n          end) as reportes,\n    (case administrador\n          when 'No' then 1\n          when 'Si' then 2\n          end) as administrador \n      from usuarios join roles on usuarios.ID_rol = roles.ID_rol  where upper(user) regexp ".concat(_mysql["default"].escape(usuario), " and pass regexp ").concat(_mysql["default"].escape(contra));
    connection.query(query, function (error, results, fields) {
      if (error) {
        reject(error);
      } else if (results.length == 1) {
        resolve(results);
      } else {
        reject('No se encontro el usuario');
      }
    });
  });
};

var _default = VerificarLogin;
exports["default"] = _default;
//# sourceMappingURL=VericarLogin.js.map