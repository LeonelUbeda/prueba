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
 * Para checkear si la tupla a la que se desea apuntar como llave foranea en editar o agregar esta borrada.
 *
 * @param Object Se manda el object con los parametros a checkear. 
 * @returns
 */
var CheckForeigns = function CheckForeigns(obj) {
  return new Promise(
  /*#__PURE__*/
  function () {
    var _ref = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee(resolve, reject) {
      var connection, schema, mysqlQuery, campoFirst, count, campo;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              connection = _CreateConnection["default"];
              _context.next = 4;
              return (0, _HandleSchema["default"])().then(function (sch) {
                return sch;
              });

            case 4:
              schema = _context.sent;
              mysqlQuery = '', campoFirst = '', count = 0;

              for (campo in obj) {
                campoFirst = campo.substr(0, 3);

                if (campoFirst === 'ID_' || campoFirst === 'SKU' && obj.tabla != 'producto') {
                  mysqlQuery += "SELECT borrado from ".concat(schema[obj.tabla][campo].foranea, " where ").concat(schema[schema[obj.tabla][campo].foranea].id, " = ").concat(obj[campo], ";\n");
                }
              }

              if (mysqlQuery === '') {
                resolve('2');
              }

              connection.query(mysqlQuery, function (error, results, fields) {
                if (error) {
                  reject(error);
                } else {
                  // checkea si las tablas referenciadas estan borradas
                  var check = true;
                  var _iteratorNormalCompletion = true;
                  var _didIteratorError = false;
                  var _iteratorError = undefined;

                  try {
                    for (var _iterator = results[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                      var resultado = _step.value;

                      if (count == 1) {
                        if (resultado[0].borrado == 1) {
                          check = false;
                        }
                      } else {
                        if (resultado.borrado == 1) {
                          check = false;
                        }
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

                  if (check) {
                    resolve();
                  } else {
                    reject(new Error('Una llave foranea apuntaba a una tupla borrada'));
                  }
                }
              });
              _context.next = 14;
              break;

            case 11:
              _context.prev = 11;
              _context.t0 = _context["catch"](0);
              reject(_context.t0);

            case 14:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[0, 11]]);
    }));

    return function (_x, _x2) {
      return _ref.apply(this, arguments);
    };
  }());
};

var _default = CheckForeigns;
exports["default"] = _default;
//# sourceMappingURL=CheckForeigns.js.map