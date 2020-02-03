"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mysql = _interopRequireDefault(require("mysql"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/**
 * La función genérica para crear la query para añadir un objeto a la base de datos.
 *
 * @param Object Cada propiedad del objeto representa un conjunto columna/valor. La propiedad tabla esta reservada para el nombre de la tabla
 * @returns
 */
var AddToDatabaseCreateQuery = function AddToDatabaseCreateQuery(obj) {
  return new Promise(function (resolve, reject) {
    var mysqlQuery = 'INSERT INTO ',
        queryCol = '',
        queryVal = ''; // Si no se mando el nombre de la tabla, se retorna falso

    if (obj.tabla == null || obj.tabla == false) {
      throw new Error('900: Ninguna tabla seleccionada');
    } // Inicializa la query


    mysqlQuery = mysqlQuery + _mysql["default"].escapeId(obj.tabla) + ' '; // Itera sobre cada propiedad del objeto, utilizando el nombre para las columnas y el valor para el mismo valor en las queries.

    for (var columna in obj) {
      if (columna != 'tabla' && columna != 'id' && columna != 'usernameMov') {
        queryCol += columna + ', ';
        queryVal += _mysql["default"].escape(obj[columna]) + ', ';
      }
    } // Si estan vacios los acumuladores, envia error


    if (queryCol == '' || queryVal == '') {
      throw new Error('901: No se mandaron valores a insertar');
    } // Quita la coma extra


    queryCol = queryCol.substr(0, queryCol.length - 2);
    queryVal = queryVal.substr(0, queryVal.length - 2); // La query final. Hace una subquery para el auto_increment

    if (obj.hasOwnProperty('id')) {
      mysqlQuery = "".concat(mysqlQuery, " ( ").concat(obj.id, ", ").concat(queryCol, ") VALUES ( (select ").concat(obj.id, " from (select * from ").concat(obj.tabla, ") as x order by ").concat(obj.id, " desc limit 1) + 1, ").concat(queryVal, ")");
    } else {
      mysqlQuery = "".concat(mysqlQuery, " ( ").concat(queryCol, ") VALUES ( ").concat(queryVal, ")");
    }

    resolve(mysqlQuery);
  });
};

var _default = AddToDatabaseCreateQuery;
exports["default"] = _default;
//# sourceMappingURL=AddToDatabaseCreateQuery.js.map