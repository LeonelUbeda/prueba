"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _CreateConnection = _interopRequireDefault(require("./../CreateConnection/CreateConnection"));

var _mysql = _interopRequireDefault(require("mysql"));

var _GenerateSKU = _interopRequireDefault(require("../GenerateSKU/GenerateSKU"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

/**
 * La función para actualizar información de un producto. Retorna el SKU resultante despues del update.
 *
 * @param Object Se manda el object con los parametros a actualizar. El .tabla esta reservado para el nombre de la tabla. Se debe de mandar el .SKU
 * @returns {String} SKU
 */
var UpdateProduct = function UpdateProduct(obj) {
  return new Promise(
  /*#__PURE__*/
  function () {
    var _ref = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee(resolve, reject) {
      var connection, oldSku, oldSub, oldMar, mysqlQuery, columnaQuery, columna;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;

              if (!(obj.SKU == '00000000000')) {
                _context.next = 3;
                break;
              }

              throw new Error('904: No pueden editar el registro con ID 0');

            case 3:
              if (!(obj.tabla != 'producto')) {
                _context.next = 5;
                break;
              }

              throw new Error('907: No es la tabla producto');

            case 5:
              console.log(obj.SKU);
              connection = _CreateConnection["default"], oldSku = obj.SKU, oldSub = obj.SKU.substr(0, 3), oldMar = obj.SKU.substr(3, 3);

              if (!(parseInt(oldSub) != obj.ID_subcategoria || parseInt(oldMar) != obj.ID_marca)) {
                _context.next = 11;
                break;
              }

              _context.next = 10;
              return (0, _GenerateSKU["default"])(obj);

            case 10:
              obj.SKU = _context.sent;

            case 11:
              // Inicializa la query con el update
              mysqlQuery = "update ".concat(obj.tabla, " set "), columnaQuery = ''; // Itera sobre todos los atributos a actualizar

              for (columna in obj) {
                if (columna != 'tabla') {
                  columnaQuery += "".concat(columna, " = ").concat(_mysql["default"].escape(obj[columna]), " , ");
                }
              } // Si no encontro ningun atributo, devuelve error con update vacío


              if (!(columnaQuery == '')) {
                _context.next = 15;
                break;
              }

              throw new Error('905: Mandaron un update vacío');

            case 15:
              // Quita la coma extra al final
              columnaQuery = columnaQuery.substr(0, columnaQuery.length - 2); // Une la query inicial, los atributos a actualizar, y la condicion where del ID

              mysqlQuery = "".concat(mysqlQuery, " ").concat(columnaQuery, " where SKU = ").concat(oldSku); //Realiza la query. Si no hay error, resuelve con los resultados

              connection.query(mysqlQuery, function (error, results, fields) {
                if (error) {
                  reject(error);
                } else {
                  resolve(obj.SKU);
                }
              });
              _context.next = 23;
              break;

            case 20:
              _context.prev = 20;
              _context.t0 = _context["catch"](0);
              reject(_context.t0);

            case 23:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[0, 20]]);
    }));

    return function (_x, _x2) {
      return _ref.apply(this, arguments);
    };
  }());
};

var _default = UpdateProduct;
exports["default"] = _default;
//# sourceMappingURL=UpdateProduct.js.map