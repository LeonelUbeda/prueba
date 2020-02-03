"use strict";

var _AddToDatabase = _interopRequireDefault(require("../ServerComponents/AddToDatabase/AddToDatabase"));

var _DeleteFromDatabase = _interopRequireDefault(require("../ServerComponents/DeleteFromDatabase/DeleteFromDatabase"));

var _UpdateDatabase = _interopRequireDefault(require("../ServerComponents/UpdateDatabase/UpdateDatabase"));

var _QueryDatabase = _interopRequireDefault(require("../ServerComponents/QueryDatabase/QueryDatabase"));

var _fs = require("fs");

var _GetSchema = _interopRequireDefault(require("../ServerComponents/HandleSchema/GetSchema"));

var _CheckForeigns = _interopRequireDefault(require("../ServerComponents/CheckForeigns/CheckForeigns"));

var _CreateConnection = _interopRequireDefault(require("../ServerComponents/CreateConnection/CreateConnection"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var router = require('express').Router();

// const subcategoria  = [
//     {
//         id: 1,
//         nombre: 'Lacteos',
//         padre: 'Alimentos'
//     },
//     {
//         id: 1,
//         nombre: 'Carnes',
//         padre: 'Alimentos'
//     },
//     {
//         id: 1,
//         nombre: 'Vegetales',
//         padre: 'Alimentos'
//     },
//     {
//         id: 1,
//         nombre: 'Frutas',
//         padre: 'Alimentos'
//     }
// ]
router.get('/clasificacion/info',
/*#__PURE__*/
function () {
  var _ref = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(req, res) {
    var categoriaQuery, marcaQuery, subcategoriaQuery, _ref2, _ref3, categoria, subcategoria, marca, schemaFull, schema;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            console.log(req.session);
            categoriaQuery = {
              tabla: 'categoria',
              columnas: ['nombre', 'id'],
              desc: true
            };
            marcaQuery = {
              tabla: 'marca',
              columnas: ['nombre', 'id'],
              desc: true
            };
            subcategoriaQuery = {
              tabla: 'subcategoria',
              desc: true,
              columnas: ['nombre', 'ID_categoria', 'id'],
              foranea: {
                ID_categoria: {
                  tabla: 'categoria',
                  columnas: ['nombre']
                }
              }
            };
            console.time("Time this");
            _context.next = 7;
            return Promise.all([(0, _QueryDatabase["default"])(categoriaQuery), (0, _QueryDatabase["default"])(subcategoriaQuery), (0, _QueryDatabase["default"])(marcaQuery)]);

          case 7:
            _ref2 = _context.sent;
            _ref3 = _slicedToArray(_ref2, 3);
            categoria = _ref3[0];
            subcategoria = _ref3[1];
            marca = _ref3[2];
            schemaFull = (0, _GetSchema["default"])(), schema = function (_ref4) {
              var categoria = _ref4.categoria,
                  subcategoria = _ref4.subcategoria,
                  marca = _ref4.marca;
              return {
                subcategoria: subcategoria,
                categoria: categoria,
                marca: marca
              };
            }(schemaFull);
            res.json({
              categoria: categoria,
              subcategoria: subcategoria,
              marca: marca,
              schema: schema
            });
            console.timeEnd("Time this");

          case 15:
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
router.post('/clasificacion/nuevo',
/*#__PURE__*/
function () {
  var _ref5 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee2(req, res) {
    var query, resp;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            query = req.body.query;

            if (typeof query == 'undefined' && typeof query.tabla == 'undefined') {
              res.status(404).end();
            }

            _context2.prev = 2;
            _context2.next = 5;
            return (0, _CheckForeigns["default"])(query).then(function () {
              return (0, _AddToDatabase["default"])(query)["catch"](function (e) {
                return res.status(404).end();
              });
            })["catch"](function (e) {
              return res.status(404).end();
            });

          case 5:
            console.log("Registro a\xF1adido a la tabla ".concat(query.tabla, " exitosamente"));
            resp = 'Elemento añadido exitosamente!';
            res.send(JSON.stringify(resp));
            _context2.next = 14;
            break;

          case 10:
            _context2.prev = 10;
            _context2.t0 = _context2["catch"](2);
            console.log(_context2.t0);
            res.status(404).end();

          case 14:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[2, 10]]);
  }));

  return function (_x3, _x4) {
    return _ref5.apply(this, arguments);
  };
}());
router.post('/clasificacion/editar',
/*#__PURE__*/
function () {
  var _ref6 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee3(req, res) {
    var query;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            query = req.body.query;

            if (typeof query == 'undefined' && typeof query.tabla == 'undefined' && typeof query.id == 'undefined') {
              res.status(404).end();
            }

            _context3.next = 4;
            return (0, _CheckForeigns["default"])(query).then(function () {
              return (0, _UpdateDatabase["default"])(query).then(function () {
                console.log("Registro ".concat(query.id, " de la tabla ").concat(query.tabla, " editado exitosamente"));
                var resp = 'Elemento editado exitosamente!';
                res.send(JSON.stringify(resp));
              })["catch"](function (err) {
                console.log(err);
                res.status(404).end();
              });
            })["catch"](function (e) {
              return res.status(404).end();
            });

          case 4:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function (_x5, _x6) {
    return _ref6.apply(this, arguments);
  };
}());
router.post('/clasificacion/eliminar', function (req, res) {
  var _req$body$query = req.body.query,
      tabla = _req$body$query.tabla,
      id = _req$body$query.id;
  console.log(req.body.query);
  var borrar = {
    tabla: tabla,
    id: id
  };
  (0, _DeleteFromDatabase["default"])(borrar).then(function () {
    if (tabla == 'lotes') {
      var connection = _CreateConnection["default"],
          fecha = new Date(),
          queryMovimiento = "insert into movimientos (user, ID_lotes, SKU, tipo, fecha, cantidad ) \n            values ('".concat(req.session.user.user, "', ").concat(borrar.id, ", (Select SKU from lotes where ID_lotes = ").concat(borrar.id, " ), \n           1, '").concat(fecha.getFullYear(), "-").concat(fecha.getMonth() + 1, "-").concat(fecha.getDate(), "',\n            (Select cantidad from lotes where ID_lotes = ").concat(borrar.id, " ));");
      connection.query(queryMovimiento);
    }
  }).then(function () {
    return res.send('OK');
  })["catch"](function (response) {
    res.status(404).end();
  });
});
router.post('/clasificacion/buscar/',
/*#__PURE__*/
function () {
  var _ref7 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee4(req, res) {
    var variable, _req$body, tabla, busqueda, tipo, pagina, query, categoriaQuery, marcaQuery, subcategoriaQuery, _ref8, _ref9, categoria, subcategoria, marca;

    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            for (variable in req.body) {
              // Cambia a minuscula todas las variables en req.body
              typeof req.body[variable] == 'string' ? req.body[variable] = req.body[variable].toLowerCase() : null;
            }

            _req$body = req.body, tabla = _req$body.tabla, busqueda = _req$body.busqueda, tipo = _req$body.tipo, pagina = _req$body.pagina;

            if (_typeof(tabla) === undefined || _typeof(busqueda) === undefined || _typeof(tipo) === undefined) {
              // Si alguna variable no existe...
              res.status(404).end();
            }

            query = {
              tabla: tabla,
              desc: true,
              limite: 10,
              //PAGE: poner esto en el router de buscar
              pagina: pagina || 0
            };
            query.condiciones = {};
            query.condiciones[tipo] = busqueda;
            _context4.t0 = tabla;
            _context4.next = _context4.t0 === 'categoria' ? 9 : _context4.t0 === 'subcategoria' ? 11 : _context4.t0 === 'marca' ? 14 : 16;
            break;

          case 9:
            query.columnas = ['nombre', 'id'];
            return _context4.abrupt("break", 17);

          case 11:
            query.columnas = ['nombre', 'ID_categoria', 'id'];
            query.foranea = {
              ID_categoria: {
                tabla: 'categoria',
                columnas: ['nombre']
              }
            };
            return _context4.abrupt("break", 17);

          case 14:
            query.columnas = ['nombre', 'id'];
            return _context4.abrupt("break", 17);

          case 16:
            return _context4.abrupt("break", 17);

          case 17:
            console.log(query);

            if (!(tabla == 'todo')) {
              _context4.next = 38;
              break;
            }

            categoriaQuery = {
              tabla: 'categoria',
              columnas: ['nombre', 'id'],
              desc: true
            };
            marcaQuery = {
              tabla: 'marca',
              columnas: ['nombre', 'id'],
              desc: true
            };
            subcategoriaQuery = {
              tabla: 'subcategoria',
              desc: true,
              columnas: ['nombre', 'ID_categoria', 'id'],
              foranea: {
                ID_categoria: {
                  tabla: 'categoria',
                  columnas: ['nombre']
                }
              }
            };
            categoriaQuery.condiciones = {};
            marcaQuery.condiciones = {};
            subcategoriaQuery.condiciones = {};
            categoriaQuery.condiciones[tipo] = busqueda;
            marcaQuery.condiciones[tipo] = busqueda;
            subcategoriaQuery.condiciones[tipo] = busqueda;
            _context4.next = 30;
            return Promise.all([(0, _QueryDatabase["default"])(categoriaQuery), (0, _QueryDatabase["default"])(subcategoriaQuery), (0, _QueryDatabase["default"])(marcaQuery)]);

          case 30:
            _ref8 = _context4.sent;
            _ref9 = _slicedToArray(_ref8, 3);
            categoria = _ref9[0];
            subcategoria = _ref9[1];
            marca = _ref9[2];
            res.json({
              categoria: categoria,
              subcategoria: subcategoria,
              marca: marca
            });
            _context4.next = 39;
            break;

          case 38:
            (0, _QueryDatabase["default"])(query).then(function (response) {
              res.send(JSON.stringify(response));
            });

          case 39:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));

  return function (_x7, _x8) {
    return _ref7.apply(this, arguments);
  };
}());
module.exports = router;
//# sourceMappingURL=clasificacion.js.map