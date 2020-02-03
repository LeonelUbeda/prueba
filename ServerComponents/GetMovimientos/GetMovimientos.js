"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _CreateConnection = _interopRequireDefault(require("./../CreateConnection/CreateConnection"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

/**
 * Funcion para conseguir los movimientos de lotes.
 *
 * 
 * @returns
 */
var GetMovimientos = function GetMovimientos(obj) {
  return new Promise(
  /*#__PURE__*/
  function () {
    var _ref = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee(resolve, reject) {
      var connection, x, mysqlQuery;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              try {
                //Crea el objeto para la conexión e importa el schema
                connection = _CreateConnection["default"];
                x = new Date();
                mysqlQuery = "select sum(cantidad) as cantidad, tipo from movimientos where ";

                if (obj.filtroFecha != 'none') {
                  mysqlQuery += "date_add(fecha, interval 1 ".concat(obj.filtroFecha, ") >= '").concat(x.getFullYear(), "-").concat(x.getMonth() + 1, "-").concat(x.getDate(), "' and ");
                }

                if (obj.filtroSKU != 'none') {
                  mysqlQuery += "SKU = ".concat(obj.filtroSKU, " and ");
                }

                mysqlQuery += "borrado = 0 group by tipo order by tipo;";
                console.log(mysqlQuery);
                connection.query(mysqlQuery, function (error, results, fields) {
                  if (error) {
                    reject(error);
                  } else {
                    var response = {};
                    var _iteratorNormalCompletion = true;
                    var _didIteratorError = false;
                    var _iteratorError = undefined;

                    try {
                      for (var _iterator = results[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                        var tupla = _step.value;

                        if (tupla.tipo == 'Borrado') {
                          response.eliminados = tupla.cantidad;
                        }

                        if (tupla.tipo == 'Sacado') {
                          response.sacados = tupla.cantidad;
                        }

                        if (tupla.tipo == 'Ingresado') {
                          response.ingresados = tupla.cantidad;
                        }
                      }
                    } catch (err) {
                      _didIteratorError = true;
                      _iteratorError = err;
                    } finally {
                      try {
                        if (!_iteratorNormalCompletion && _iterator["return"] != null) {
                          _iterator["return"]();
                        }
                      } finally {
                        if (_didIteratorError) {
                          throw _iteratorError;
                        }
                      }
                    }

                    resolve(response);
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

var _default = GetMovimientos;
exports["default"] = _default;
//# sourceMappingURL=GetMovimientos.js.map