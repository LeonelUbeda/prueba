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
 * La función para hacer una query.
 *
 *  @param {number} obj.pagina El número de la página
 *  @param {array.<string>} obj.columnas Las columnas a ser buscadas, en su respectivo orden
 *  @param {object} foranea Un objeto con objetos que representan las columnas que pertenecen a otra tabla.
 *  @param {array} obj.orden La columna por la cual se va a ordenar
 *  @param {boolean} obj.desc Invertir el orden del buscar
 *  @param {number} obj.limite La cantidad de resultados por query.
 *  @param { boolean } obj.borrados Mostrar los borrados o no. 
 * @return {Array } El array con los resultados.
 */
var QueryDatabase = function QueryDatabase(obj) {
  return new Promise(
  /*#__PURE__*/
  function () {
    var _ref = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee(resolve, reject) {
      var forCheck, forNombres, nombre, connection, schema, mysqlQuery, columnaQuery, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, _columna, _iteratorNormalCompletion3, _didIteratorError3, _iteratorError3, _iterator3, _step3, columnaSub, _iteratorNormalCompletion2, _didIteratorError2, _iteratorError2, _iterator2, _step2, columna, condicionQuery, condicion, idFor, referencedTable;

      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              forCheck = false, forNombres = []; //Valores predeterminados

              if (!obj.hasOwnProperty('orden')) {
                obj.orden = 'id';
              }

              if (!obj.hasOwnProperty('pagina')) {
                obj.pagina = 0;
              }

              if (!obj.hasOwnProperty('limite')) {
                obj.limite = 10;
              }

              if (!obj.hasOwnProperty('borrados')) {
                obj.borrados = false;
              }

              if (!(!obj.hasOwnProperty('columnas') || obj.columnas.length == 0)) {
                _context.next = 8;
                break;
              }

              throw new Error('Error: no se envio un array en .columnas');

            case 8:
              if (obj.hasOwnProperty('foranea')) {
                forCheck = true;

                for (nombre in obj.foranea) {
                  forNombres.push(nombre);
                }
              } // Si se intenta modificar el registro 0, da un error


              if (!(obj.id == 0)) {
                _context.next = 11;
                break;
              }

              throw new Error('905: No pueden editar el registro con ID 0');

            case 11:
              connection = _CreateConnection["default"];
              _context.next = 14;
              return (0, _HandleSchema["default"])().then(function (sch) {
                return sch;
              })["catch"](function (err) {
                throw err;
              });

            case 14:
              schema = _context.sent;

              if (schema.hasOwnProperty(obj.tabla)) {
                _context.next = 17;
                break;
              }

              throw new Error('902: Esa tabla no existe en el schema');

            case 17:
              //Asigna el nombre de la tabla al objeto
              obj.idname = schema[obj.tabla].id; // Inicializa la query con el update

              mysqlQuery = "select "; // Si no se envian atributos, por defecto buscara todo

              if (obj.hasOwnProperty('columnas')) {
                _context.next = 23;
                break;
              }

              mysqlQuery += "* from ".concat(obj.tabla, " ");
              _context.next = 100;
              break;

            case 23:
              columnaQuery = '';
              _iteratorNormalCompletion = true;
              _didIteratorError = false;
              _iteratorError = undefined;
              _context.prev = 27;
              _iterator = obj.columnas[Symbol.iterator]();

            case 29:
              if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
                _context.next = 62;
                break;
              }

              _columna = _step.value;

              if (!(_columna != 'id')) {
                _context.next = 58;
                break;
              }

              if (!forNombres.includes(_columna)) {
                _context.next = 55;
                break;
              }

              columnaQuery += "".concat(forCheck ? "".concat(obj.tabla, ".") : '').concat(_columna, " , ");
              _iteratorNormalCompletion3 = true;
              _didIteratorError3 = false;
              _iteratorError3 = undefined;
              _context.prev = 37;

              for (_iterator3 = obj.foranea[_columna].columnas[Symbol.iterator](); !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                columnaSub = _step3.value;
                columnaQuery += "".concat(obj.foranea[_columna].tabla, ".").concat(columnaSub, " as '").concat(obj.foranea[_columna].tabla, "__").concat(columnaSub, "' , ");
              }

              _context.next = 45;
              break;

            case 41:
              _context.prev = 41;
              _context.t0 = _context["catch"](37);
              _didIteratorError3 = true;
              _iteratorError3 = _context.t0;

            case 45:
              _context.prev = 45;
              _context.prev = 46;

              if (!_iteratorNormalCompletion3 && _iterator3["return"] != null) {
                _iterator3["return"]();
              }

            case 48:
              _context.prev = 48;

              if (!_didIteratorError3) {
                _context.next = 51;
                break;
              }

              throw _iteratorError3;

            case 51:
              return _context.finish(48);

            case 52:
              return _context.finish(45);

            case 53:
              _context.next = 56;
              break;

            case 55:
              columnaQuery += "".concat(forCheck ? "".concat(obj.tabla, ".") : '').concat(_columna, " , ");

            case 56:
              _context.next = 59;
              break;

            case 58:
              columnaQuery += "".concat(forCheck ? "".concat(obj.tabla, ".") : '').concat(obj.idname, " as id , ");

            case 59:
              _iteratorNormalCompletion = true;
              _context.next = 29;
              break;

            case 62:
              _context.next = 68;
              break;

            case 64:
              _context.prev = 64;
              _context.t1 = _context["catch"](27);
              _didIteratorError = true;
              _iteratorError = _context.t1;

            case 68:
              _context.prev = 68;
              _context.prev = 69;

              if (!_iteratorNormalCompletion && _iterator["return"] != null) {
                _iterator["return"]();
              }

            case 71:
              _context.prev = 71;

              if (!_didIteratorError) {
                _context.next = 74;
                break;
              }

              throw _iteratorError;

            case 74:
              return _context.finish(71);

            case 75:
              return _context.finish(68);

            case 76:
              if (!(columnaQuery == '')) {
                _context.next = 78;
                break;
              }

              throw new Error('905: Mandaron un array vacio para los atributos');

            case 78:
              columnaQuery = columnaQuery.substr(0, columnaQuery.length - 2);
              mysqlQuery += "".concat(columnaQuery, " from ").concat(obj.tabla, " ");

              if (!forCheck) {
                _context.next = 100;
                break;
              }

              _iteratorNormalCompletion2 = true;
              _didIteratorError2 = false;
              _iteratorError2 = undefined;
              _context.prev = 84;

              for (_iterator2 = forNombres[Symbol.iterator](); !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                columna = _step2.value;
                mysqlQuery += "join ".concat(obj.foranea[columna].tabla, " on ").concat(obj.tabla, ".").concat(columna, " = ").concat(obj.foranea[columna].tabla, ".").concat(columna, " ");
              }

              _context.next = 92;
              break;

            case 88:
              _context.prev = 88;
              _context.t2 = _context["catch"](84);
              _didIteratorError2 = true;
              _iteratorError2 = _context.t2;

            case 92:
              _context.prev = 92;
              _context.prev = 93;

              if (!_iteratorNormalCompletion2 && _iterator2["return"] != null) {
                _iterator2["return"]();
              }

            case 95:
              _context.prev = 95;

              if (!_didIteratorError2) {
                _context.next = 98;
                break;
              }

              throw _iteratorError2;

            case 98:
              return _context.finish(95);

            case 99:
              return _context.finish(92);

            case 100:
              //Las condiciones where. Si no se enviaron, solo se pone que no muestre el 0
              if (!obj.hasOwnProperty('condiciones')) {
                mysqlQuery += "where ".concat(obj.idname, " != 0 ").concat(obj.borrados ? '' : "and ".concat(obj.tabla, ".borrado = false "));
              } else {
                //Inicializa condicion
                condicionQuery = ''; //Itera sobre todos los atributos de condiciones

                for (condicion in obj.condiciones) {
                  if (obj.condiciones[condicion] != '') {
                    if (condicion.substr(0, 4) == 'for_') {
                      idFor = condicion.substr(4), referencedTable = obj.foranea[idFor].tabla;
                      condicionQuery += "upper(".concat(referencedTable, ".nombre) regexp ").concat(_mysql["default"].escape(obj.condiciones[condicion]), " and ");
                    } else if (condicion != 'id') {
                      condicionQuery += "upper(".concat(obj.tabla, ".").concat(condicion, ") regexp ").concat(_mysql["default"].escape(obj.condiciones[condicion]), " and ");
                    } else {
                      condicionQuery += "".concat(obj.tabla, ".").concat(obj.idname, " = ").concat(_mysql["default"].escape(obj.condiciones[condicion]), " and ");
                    }
                  }
                } //Si se mando un objeto condicion vacio, se retorna un error
                //Se quita el ultimo and y se pone esta seccion a la query


                mysqlQuery += "where ".concat(condicionQuery, " ").concat(obj.idname, " != 0 ").concat(obj.borrados ? '' : "and ".concat(obj.tabla, ".borrado = false "));
              } // Orden


              mysqlQuery += "order by ".concat(obj.orden == 'id' ? "".concat(obj.tabla, ".").concat(obj.idname) : "".concat(obj.tabla, ".").concat(obj.orden), " ").concat(obj.desc ? 'desc ' : '', " "); // Pagina

              mysqlQuery += "limit ".concat(obj.limite, " ").concat(obj.pagina == 0 ? '' : "offset ".concat(obj.pagina * obj.limite), ";\n"); //Sacar count de la tabla 

              mysqlQuery += "select count(*) as count from ".concat(obj.tabla, ";"); // Realiza la query

              connection.query(mysqlQuery, function (error, results, fields) {
                if (error) {
                  reject(error);
                } else {
                  var response = {};
                  response.body = results[0];
                  response.count = Math.ceil(results[1][0].count / obj.limite) - 1;
                  resolve(response);
                }
              });
              _context.next = 110;
              break;

            case 107:
              _context.prev = 107;
              _context.t3 = _context["catch"](0);
              resolve(_context.t3);

            case 110:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[0, 107], [27, 64, 68, 76], [37, 41, 45, 53], [46,, 48, 52], [69,, 71, 75], [84, 88, 92, 100], [93,, 95, 99]]);
    }));

    return function (_x, _x2) {
      return _ref.apply(this, arguments);
    };
  }());
};

var _default = QueryDatabase;
exports["default"] = _default;
//# sourceMappingURL=QueryDatabase.js.map