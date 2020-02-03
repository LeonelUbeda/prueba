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
 * Generar un nuevo SKU.
 *
 * @param {Number} subcategoria  La subcategoria del producto.
 * @param {Number} marca  La marca del producto
 * @returns {String}
 */
var GenerateSKU = function GenerateSKU(obj) {
  return new Promise(
  /*#__PURE__*/
  function () {
    var _ref = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee(resolve, reject) {
      var connection, subcategoria, marca, mysqlQuery;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              try {
                //Crea el objeto para la conexión e importa el schema
                connection = _CreateConnection["default"], subcategoria = obj.ID_subcategoria, marca = obj.ID_marca, mysqlQuery = "select sku from producto where (ID_subcategoria = ".concat(subcategoria, " or ID_subcategoria = 0) and (ID_marca = ").concat(marca, " or ID_marca = 0) order by sku desc;"); //Realiza la query. Si no hay error, resuelve con los resultados

                connection.query(mysqlQuery, function (error, results, fields) {
                  if (error) {
                    reject(error);
                  } else {
                    var sku = results[0].sku,
                        variante = parseInt(sku.substring(6)) + 1,
                        varianteString = variante.toString(),
                        subcategoriaString = subcategoria.toString(),
                        marcaString = marca.toString(),
                        longitud = varianteString.length; // Hace que la variante nueva tenga 5 digitos

                    for (; longitud < 5; longitud++) {
                      varianteString = '0' + varianteString;
                    }

                    longitud = subcategoriaString.length; //Hace que la subcategoria tenga 3 digitos

                    for (; longitud < 3; longitud++) {
                      subcategoriaString = '0' + subcategoriaString;
                    }

                    longitud = marcaString.length; // Hace que la marca tenga 3 digitos

                    for (; longitud < 3; longitud++) {
                      marcaString = '0' + marcaString;
                    }

                    var newSKU = "".concat(subcategoriaString).concat(marcaString).concat(varianteString); //retorna el resultado

                    resolve(newSKU);
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

var _default = GenerateSKU;
exports["default"] = _default;
//# sourceMappingURL=GenerateSKU.js.map