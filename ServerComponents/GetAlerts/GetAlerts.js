"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _CreateConnection = _interopRequireDefault(require("./../CreateConnection/CreateConnection"));

var _HandleSchema = _interopRequireDefault(require("../HandleSchema/HandleSchema"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

/**
 * Funcion para conseguir las alertas de los lotes.
 *
 * 
 * @returns
 */
var GetAlerts = function GetAlerts() {
  return new Promise(
  /*#__PURE__*/
  function () {
    var _ref = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee(resolve, reject) {
      var connection, mysqlQuery, x;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              try {
                //Crea el objeto para la conexión e importa el schema
                connection = _CreateConnection["default"];
                mysqlQuery = "select producto.nombre, producto.minimo_stock, cantidad, producto.sku as producto, lotes.sku as lotes from producto join (select id_lotes, sum(cantidad) as cantidad, sku, borrado from lotes group by sku) as lotes on producto.sku = lotes.sku where producto.borrado = false and lotes.borrado = false and lotes.cantidad <= producto.minimo_stock and lotes.id_lotes != 0 and producto.vigilar = true;";
                x = new Date();
                mysqlQuery += "select id_lotes, dias_antes_vencimiento, fecha_caducidad, producto.sku as producto, lotes.sku as lotes , producto.nombre as nombre from producto join (select id_lotes, fecha_caducidad, sku, borrado from lotes) as lotes on producto.sku = lotes.sku where producto.borrado = false and lotes.borrado = false and date_sub(fecha_caducidad,interval dias_antes_vencimiento day) <= '".concat(x.getFullYear(), "-").concat(x.getMonth() + 1, "-").concat(x.getDate(), "' and producto.perecedero = 1;");
                connection.query(mysqlQuery, function (error, results, fields) {
                  if (error) {
                    reject(error);
                  } else {
                    for (var tupla in results[1]) {
                      var fecha = results[1][tupla].fecha_caducidad;
                      results[1][tupla].fecha_caducidad = "".concat(fecha.getFullYear(), "-").concat(fecha.getMonth() + 1, "-").concat(fecha.getDate());
                    }

                    resolve(results);
                  }
                });
              } catch (error) {
                reject(error);
              }

            case 1:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    return function (_x, _x2) {
      return _ref.apply(this, arguments);
    };
  }());
};

var _default = GetAlerts;
exports["default"] = _default;
//# sourceMappingURL=GetAlerts.js.map