"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _CreateConnection = _interopRequireDefault(require("./../CreateConnection/CreateConnection"));

var _HandleSchema = _interopRequireDefault(require("../HandleSchema/HandleSchema"));

var _QueryDatabase = _interopRequireDefault(require("../QueryDatabase/QueryDatabase"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

/**
 * Funcion para retirar producto unitario de los lotes.
 *
 * 
 * @returns
 */
var LotesTakeOut = function LotesTakeOut(obj) {
  return new Promise(
  /*#__PURE__*/
  function () {
    var _ref = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee(resolve, reject) {
      var query, fecha, mysqlQuery, mysqlMovimiento, acumulador, lotesSacados, cantidadLotes, sacadosLotes, results, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, lote, nuevaCantidad;

      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              query = {
                tabla: 'lotes',
                columnas: ['cantidad', 'ID_lotes'],
                condiciones: {
                  sku: obj.sku
                },
                orden: 'fecha_caducidad',
                limite: 400
              }, fecha = new Date();
              mysqlQuery = '', mysqlMovimiento = 'insert into movimientos (user, ID_lotes, SKU, tipo, fecha, cantidad ) values ', acumulador = obj.cantidad, lotesSacados = [], cantidadLotes = [], sacadosLotes = [];
              _context.next = 5;
              return (0, _QueryDatabase["default"])(query);

            case 5:
              results = _context.sent;
              _iteratorNormalCompletion = true;
              _didIteratorError = false;
              _iteratorError = undefined;
              _context.prev = 9;
              _iterator = results.body[Symbol.iterator]();

            case 11:
              if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
                _context.next = 35;
                break;
              }

              lote = _step.value;

              if (!(lote.cantidad != 0)) {
                _context.next = 32;
                break;
              }

              lotesSacados.push(lote.ID_lotes);

              if (!(lote.cantidad > acumulador)) {
                _context.next = 25;
                break;
              }

              nuevaCantidad = lote.cantidad - acumulador;
              sacadosLotes.push(acumulador);
              cantidadLotes.push(nuevaCantidad);
              mysqlMovimiento += "('".concat(obj.user, "', ").concat(lote.ID_lotes, ", '").concat(obj.sku, "', 2, '").concat(fecha.getFullYear(), "-").concat(fecha.getMonth() + 1, "-").concat(fecha.getDate(), "', ").concat(acumulador, "), ");
              acumulador = 0;
              mysqlQuery += "update lotes set cantidad = ".concat(nuevaCantidad).concat(nuevaCantidad == 0 ? ', marcarSalida = 1' : '', " where ID_lotes = ").concat(lote.ID_lotes, ";\n");
              return _context.abrupt("break", 35);

            case 25:
              acumulador = acumulador - lote.cantidad;
              sacadosLotes.push(lote.cantidad);
              cantidadLotes.push(0);
              mysqlQuery += "update lotes set cantidad = 0, marcarSalida = 1 where ID_lotes = ".concat(lote.ID_lotes, ";\n");
              mysqlMovimiento += "('".concat(obj.user, "', ").concat(lote.ID_lotes, ", '").concat(obj.sku, "', 2, '").concat(fecha.getFullYear(), "-").concat(fecha.getMonth() + 1, "-").concat(fecha.getDate(), "', ").concat(lote.cantidad, "), ");

              if (!(acumulador == 0)) {
                _context.next = 32;
                break;
              }

              return _context.abrupt("break", 35);

            case 32:
              _iteratorNormalCompletion = true;
              _context.next = 11;
              break;

            case 35:
              _context.next = 41;
              break;

            case 37:
              _context.prev = 37;
              _context.t0 = _context["catch"](9);
              _didIteratorError = true;
              _iteratorError = _context.t0;

            case 41:
              _context.prev = 41;
              _context.prev = 42;

              if (!_iteratorNormalCompletion && _iterator["return"] != null) {
                _iterator["return"]();
              }

            case 44:
              _context.prev = 44;

              if (!_didIteratorError) {
                _context.next = 47;
                break;
              }

              throw _iteratorError;

            case 47:
              return _context.finish(44);

            case 48:
              return _context.finish(41);

            case 49:
              mysqlMovimiento = mysqlMovimiento.substr(0, mysqlMovimiento.length - 2) + ';';
              mysqlQuery = mysqlQuery + mysqlMovimiento;
              console.log(mysqlMovimiento);

              if (acumulador != 0) {
                reject();
              } else {
                _CreateConnection["default"].query(mysqlQuery, function (error, results, fields) {
                  if (error) {
                    reject(error);
                  } else {
                    var response = {
                      ids: lotesSacados,
                      cantidad: cantidadLotes,
                      sacados: sacadosLotes
                    };
                    resolve(response);
                  }
                });
              }

              _context.next = 58;
              break;

            case 55:
              _context.prev = 55;
              _context.t1 = _context["catch"](0);
              reject(_context.t1);

            case 58:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[0, 55], [9, 37, 41, 49], [42,, 44, 48]]);
    }));

    return function (_x, _x2) {
      return _ref.apply(this, arguments);
    };
  }());
};

var _default = LotesTakeOut;
exports["default"] = _default;
//# sourceMappingURL=LotesTakeOut.js.map