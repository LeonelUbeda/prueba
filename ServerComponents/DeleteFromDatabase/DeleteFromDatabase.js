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
 * La función para borrar una base de dato.
 *
 * @param Object Se manda .id con el ID de la tabla y .tabla con el nombre de la tabla.
 * @returns
 */
var DeleteFromDatabase = function DeleteFromDatabase(obj) {
  return new Promise(
  /*#__PURE__*/
  function () {
    var _ref = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee(resolve, reject) {
      var connection, schema;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              if (!(obj.id == 0)) {
                _context.next = 2;
                break;
              }

              throw new Error('903: No pueden borrar el registro con ID 0');

            case 2:
              connection = _CreateConnection["default"];
              _context.next = 5;
              return (0, _HandleSchema["default"])().then(function (sch) {
                return sch;
              })["catch"](function (err) {
                throw err;
              });

            case 5:
              schema = _context.sent;
              ;

              if (schema.hasOwnProperty(obj.tabla)) {
                _context.next = 9;
                break;
              }

              throw new Error('902: Esa tabla no existe en el schema');

            case 9:
              obj.idname = schema[obj.tabla].id; //Checkea si la tabla tiene hijos foreign keys

              connection.query("select TABLE_NAME from INFORMATION_SCHEMA.KEY_COLUMN_USAGE\n    where REFERENCED_TABLE_SCHEMA = '".concat(process.db.database, "' AND REFERENCED_TABLE_NAME = '").concat(obj.tabla, "';"), function (error, results, fields) {
                if (error) {
                  reject(error);
                  return null;
                } //Si hay tablas hijos, inicializa este codigo


                if (results.length > 0) {
                  var changeQuery = ''; //Crea el query con cada tabla hijo para actualizar el id al 0

                  var _iteratorNormalCompletion = true;
                  var _didIteratorError = false;
                  var _iteratorError = undefined;

                  try {
                    for (var _iterator = results[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                      var child = _step.value;
                      changeQuery += "update ".concat(child.TABLE_NAME, " set ").concat(obj.idname, " = 0 where ").concat(obj.idname, " = ").concat(obj.id, "; \n");
                    } //Si hay children tables, cambia las foreign keys a 0

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

                  if (changeQuery != '') {
                    connection.query(changeQuery, function (error, results, fields) {
                      if (error) {
                        reject(error);
                      }
                    });
                  }
                } //Crea la query para borrar el registro


                var deleteQuery = "update ".concat(obj.tabla, " set borrado = true where ").concat(obj.idname, " = '").concat(obj.id, "'"); //Ejecuta la query

                connection.query(deleteQuery, function (error, results, fields) {
                  if (error) {
                    reject(error);
                    return null;
                  }

                  resolve(results);
                });
              });

            case 11:
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

var _default = DeleteFromDatabase;
exports["default"] = _default;
//# sourceMappingURL=DeleteFromDatabase.js.map