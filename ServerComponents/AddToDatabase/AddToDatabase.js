"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _AddToDatabaseCreateQuery = _interopRequireDefault(require("./AddToDatabaseCreateQuery"));

var _CreateConnection = _interopRequireDefault(require("./../CreateConnection/CreateConnection"));

var _HandleSchema = _interopRequireDefault(require("../HandleSchema/HandleSchema"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

/**
 * La función genérica para añadir un objeto a la base de datos.
 *
 * @param Object Cada propiedad del objeto representa un conjunto columna/valor. La propiedad .tabla esta reservada para el nombre de la tabla. La propiedad .id esta reservada pero no se envia.
 * @returns
 */
var AddToDatabase = function AddToDatabase(obj) {
  return new Promise(
  /*#__PURE__*/
  function () {
    var _ref = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee(resolve, reject) {
      var schema, connection, fecha;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              _context.next = 3;
              return (0, _HandleSchema["default"])().then(function (sch) {
                return sch;
              })["catch"](function (err) {
                throw err;
              });

            case 3:
              schema = _context.sent;

              if (schema.hasOwnProperty(obj.tabla)) {
                _context.next = 6;
                break;
              }

              throw new Error('902: Esa tabla no existe en el schema');

            case 6:
              obj.id = schema[obj.tabla].id; //Crea el objeto para la conexión

              connection = _CreateConnection["default"], fecha = new Date();
              ; //Realiza la query

              (0, _AddToDatabaseCreateQuery["default"])(obj).then(function (query) {
                return connection.query(query, function (error, results, fields) {
                  // Si hay un error, devuelve la promesa fallida
                  if (error) {
                    reject(error);
                  } else {
                    // De lo contrario, devuelve los resultados
                    resolve(results);

                    if (obj.tabla == 'lotes') {
                      console.log(results);
                      var queryMovimiento = "insert into movimientos (user, ID_lotes, SKU, tipo, fecha, cantidad ) \n           values ('".concat(obj.usernameMov, "', (Select ID_lotes from lotes order by ID_lotes desc limit 1) ,'").concat(obj.sku, "', \n          3, '").concat(fecha.getFullYear(), "-").concat(fecha.getMonth() + 1, "-").concat(fecha.getDate(), "', ").concat(obj.cantidad, ");");
                      connection.query(queryMovimiento);
                    }

                    return false;
                  }
                });
              });
              _context.next = 15;
              break;

            case 12:
              _context.prev = 12;
              _context.t0 = _context["catch"](0);
              reject(_context.t0);

            case 15:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[0, 12]]);
    }));

    return function (_x, _x2) {
      return _ref.apply(this, arguments);
    };
  }());
};

var _default = AddToDatabase;
exports["default"] = _default;
//# sourceMappingURL=AddToDatabase.js.map