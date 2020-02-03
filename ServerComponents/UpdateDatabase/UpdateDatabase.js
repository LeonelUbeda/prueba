"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _CreateConnection = _interopRequireDefault(require("./../CreateConnection/CreateConnection"));

var _mysql = _interopRequireDefault(require("mysql"));

var _HandleSchema = _interopRequireDefault(require("../HandleSchema/HandleSchema"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

/**
 * La función para actualizar información.
 *
 * @param Object Se manda el object con los parametros a actualizar. El .tabla esta reservado para el nombre de la tabla y .id para el ID a actualizar.
 * @returns
 */
var UpdateDatabase = function UpdateDatabase(obj) {
  return new Promise(
  /*#__PURE__*/
  function () {
    var _ref = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee(resolve, reject) {
      var connection, schema, mysqlQuery, columnaQuery, columna;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;

              if (!(obj.id == 0)) {
                _context.next = 3;
                break;
              }

              throw new Error('904: No pueden editar el registro con ID 0');

            case 3:
              connection = _CreateConnection["default"];
              _context.next = 6;
              return (0, _HandleSchema["default"])().then(function (sch) {
                return sch;
              });

            case 6:
              schema = _context.sent;

              if (schema.hasOwnProperty(obj.tabla)) {
                _context.next = 9;
                break;
              }

              throw new Error('902: Esa tabla no existe en el schema');

            case 9:
              //Asigna el nombre de la tabla al objeto
              obj.idname = schema[obj.tabla].id; // Inicializa la query con el update

              mysqlQuery = "update ".concat(obj.tabla, " set "), columnaQuery = ''; // Itera sobre todos los atributos a actualizar

              for (columna in obj) {
                if (columna != 'tabla' && columna != 'id' && columna != 'idname') {
                  columnaQuery += "".concat(columna, " = ").concat(_mysql["default"].escape(obj[columna]), " , ");
                }
              } // Si no encontro ningun atributo, devuelve error con update vacío


              if (!(columnaQuery == '')) {
                _context.next = 14;
                break;
              }

              throw new Error('905: Mandaron un update vacío');

            case 14:
              // Quita la coma extra al final
              columnaQuery = columnaQuery.substr(0, columnaQuery.length - 2); // Une la query inicial, los atributos a actualizar, y la condicion where del ID

              mysqlQuery = "".concat(mysqlQuery, " ").concat(columnaQuery, " where ").concat(obj.idname, " = ").concat(obj.id); //Realiza la query. Si no hay error, resuelve con los resultados

              connection.query(mysqlQuery, function (error, results, fields) {
                if (error) {
                  reject(error);
                } else {
                  resolve(results);
                }
              });
              _context.next = 22;
              break;

            case 19:
              _context.prev = 19;
              _context.t0 = _context["catch"](0);
              reject(_context.t0);

            case 22:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[0, 19]]);
    }));

    return function (_x, _x2) {
      return _ref.apply(this, arguments);
    };
  }());
};

var _default = UpdateDatabase;
exports["default"] = _default;
//# sourceMappingURL=UpdateDatabase.js.map