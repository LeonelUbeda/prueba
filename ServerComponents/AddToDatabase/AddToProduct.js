"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _AddToDatabaseCreateQuery = _interopRequireDefault(require("./AddToDatabaseCreateQuery"));

var _CreateConnection = _interopRequireDefault(require("./../CreateConnection/CreateConnection"));

var _GenerateSKU = _interopRequireDefault(require("../GenerateSKU/GenerateSKU"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

/**
 * La función genérica para añadir un producto a la base de datos.
 *
 * @param Object Se envia todas las propiedades correspondientes a los campos de la tabla producto, excepto el campo de sku. La propiedad .tabla de ser 'producto para verificar
 * @returns
 */
var AddToProduct = function AddToProduct(obj) {
  return new Promise(
  /*#__PURE__*/
  function () {
    var _ref = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee(resolve, reject) {
      var sku, connection;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;

              if (!(obj.tabla != 'producto')) {
                _context.next = 3;
                break;
              }

              throw new Error('907: No es la tabla producto');

            case 3:
              _context.next = 5;
              return (0, _GenerateSKU["default"])(obj);

            case 5:
              sku = _context.sent;
              obj.sku = sku; //Crea el objeto para la conexión

              connection = _CreateConnection["default"]; //Realiza la query

              (0, _AddToDatabaseCreateQuery["default"])(obj).then(function (query) {
                return connection.query(query, function (error, results, fields) {
                  // Si hay un error, devuelve la promesa fallida
                  if (error) {
                    reject(error);
                  } else {
                    // De lo contrario, devuelve los resultados
                    resolve(results);
                    return false;
                  }
                });
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

var _default = AddToProduct;
exports["default"] = _default;
//# sourceMappingURL=AddToProduct.js.map