"use strict";

var _AddToDatabase = _interopRequireDefault(require("../ServerComponents/AddToDatabase/AddToDatabase"));

var _UpdateDatabase = _interopRequireDefault(require("../ServerComponents/UpdateDatabase/UpdateDatabase"));

var _DeleteFromDatabase = _interopRequireDefault(require("../ServerComponents/DeleteFromDatabase/DeleteFromDatabase"));

var _CreateConnection = _interopRequireDefault(require("../ServerComponents/CreateConnection/CreateConnection"));

var _QueryDatabase = _interopRequireDefault(require("../ServerComponents/QueryDatabase/QueryDatabase"));

var _AddToProduct = _interopRequireDefault(require("../ServerComponents/AddToDatabase/AddToProduct"));

var _CheckForeigns = _interopRequireDefault(require("../ServerComponents/CheckForeigns/CheckForeigns"));

var _UpdateProduct = _interopRequireDefault(require("../ServerComponents/UpdateDatabase/UpdateProduct"));

var _GetMovimientos = _interopRequireDefault(require("../ServerComponents/GetMovimientos/GetMovimientos"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var router = require('express').Router();

var connection = _CreateConnection["default"];
router.get('/clientes', function (req, res) {
  var cliente = {
    tabla: 'cliente',
    columnas: ['nombre', 'direccion', 'telefono'],
    orden: 'direccion',
    desc: true
  };
  (0, _QueryDatabase["default"])(cliente); //.then((response) => console.log(response))

  connection.query('SELECT * FROM Cliente limit 10 ; SELECT Count(*) AS total from Cliente;', function (error, results, fields) {
    if (error) throw error;
    var respuesta = JSON.parse(JSON.stringify(results[0]));
    var contar = JSON.parse(JSON.stringify(results[1]));
    contar = contar[0].total;
    console.log(respuesta);
    res.render('clientes.hbs', {
      respuesta: respuesta,
      contar: contar
    });
  });
});
router.post('/clientes/nuevo', function (req, res) {
  console.log(req.body);
  var cliente = {
    tabla: 'cliente',
    nombre: req.body.nombre,
    telefono: req.body.telefono,
    direccion: req.body.telefono
  };
  (0, _AddToDatabase["default"])(cliente).then(function () {
    return res.redirect('/clientes');
  })["catch"](function (response) {
    return console.log(response);
  });
});
router.post('/clientes/borrar', function (req, res) {
  console.log(req.body.id);
  var cliente = {
    tabla: 'cliente',
    id: req.body.id
  };
  (0, _DeleteFromDatabase["default"])(cliente).then(res.send("Elimnado!"))["catch"](function (response) {
    return console.log(response);
  });
});
router.post('/clientes/actualizar/', function (req, res) {
  var _req$body = req.body,
      nombre = _req$body.nombre,
      telefono = _req$body.telefono,
      direccion = _req$body.direccion,
      id = _req$body.id;
  console.log(nombre);
  var cliente = {
    tabla: 'cliente',
    id: id,
    nombre: nombre,
    telefono: telefono,
    direccion: direccion
  };
  (0, _UpdateDatabase["default"])(cliente).then(function () {
    return res.send("OK");
  })["catch"](function (response) {
    return console.log('response');
  });
});
router.post('/clientes/buscar', function (req, res) {
  var _req$body2 = req.body,
      busqueda = _req$body2.busqueda,
      check = _req$body2.check;
  connection.query("SELECT * from Cliente where ".concat(check, " like '%").concat(busqueda, "%' "), function (error, results, fields) {
    if (error) throw error;
    results.forEach(function (results) {
      console.log('\n\n\n\n\n');
      console.log('Se ha encontrado ' + results.nombre);
    });
    var respuesta = JSON.parse(JSON.stringify(results));
    res.json({
      respuesta: respuesta
    });
  });
});
router.post('/productos/editar',
/*#__PURE__*/
function () {
  var _ref = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(req, res) {
    var _req$body$query, marca, subcategoria, margen, impuesto, nombre, descripcion, minimoStock, vigilar, perecedero, sku, dias_antes_vencimiento, Query;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _req$body$query = req.body.query, marca = _req$body$query.marca, subcategoria = _req$body$query.subcategoria, margen = _req$body$query.margen, impuesto = _req$body$query.impuesto, nombre = _req$body$query.nombre, descripcion = _req$body$query.descripcion, minimoStock = _req$body$query.minimoStock, vigilar = _req$body$query.vigilar, perecedero = _req$body$query.perecedero, sku = _req$body$query.sku, dias_antes_vencimiento = _req$body$query.dias_antes_vencimiento;
            Query = {
              tabla: 'producto',
              ID_marca: marca,
              ID_subcategoria: subcategoria,
              margen_ganancia: margen,
              porcentaje_impuestos: impuesto,
              nombre: nombre,
              descripcion: descripcion,
              vigilar: vigilar,
              minimo_stock: minimoStock,
              perecedero: perecedero,
              SKU: sku,
              dias_antes_vencimiento: dias_antes_vencimiento
            };
            console.log(Query);
            _context.next = 5;
            return (0, _CheckForeigns["default"])(Query).then(function () {
              (0, _UpdateProduct["default"])(Query).then(console.log('Elemento editado exitosamente')).then(res.send('OK'))["catch"](function (error) {
                return console.log(error);
              })["catch"](function () {
                return res.status(404).end();
              });
            })["catch"](function (e) {
              return res.status(404).end();
            });

          case 5:
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
router.post('/productos/nuevo', function (req, res) {
  console.log(req.body.query);
  var _req$body$query2 = req.body.query,
      marca = _req$body$query2.marca,
      subcategoria = _req$body$query2.subcategoria,
      margen = _req$body$query2.margen,
      impuesto = _req$body$query2.impuesto,
      nombre = _req$body$query2.nombre,
      descripcion = _req$body$query2.descripcion,
      minimoStock = _req$body$query2.minimoStock,
      vigilar = _req$body$query2.vigilar,
      perecedero = _req$body$query2.perecedero,
      dias_antes_vencimiento = _req$body$query2.dias_antes_vencimiento;
  var Query = {
    tabla: 'producto',
    ID_marca: marca,
    ID_subcategoria: subcategoria,
    margen_ganancia: margen,
    porcentaje_impuestos: impuesto,
    nombre: nombre,
    descripcion: descripcion,
    vigilar: vigilar,
    minimo_stock: minimoStock,
    perecedero: perecedero,
    dias_antes_vencimiento: dias_antes_vencimiento
  };

  if (nombre !== '') {
    (0, _AddToProduct["default"])(Query).then(function () {
      return res.send('OK');
    }).then(console.log('Elemento anadido exitosamente'))["catch"](function (error) {
      console.log(error);
      res.status(404).end();
    });
  } else {
    res.status(404).end();
  }
});
router.post('/productos/eliminar', function (req, res) {
  var sku = req.body.query;
  var Query = {
    tabla: 'producto',
    id: sku
  };
  (0, _DeleteFromDatabase["default"])(Query).then(res.send('OK'))["catch"](function (e) {
    return console.log(e);
  });
});
router.post('/productos/info', function (req, res) {
  var _req$body3 = req.body,
      pagina = _req$body3.pagina,
      busqueda = _req$body3.busqueda;
  var Query = {
    tabla: 'producto',
    desc: true,
    columnas: ['nombre', 'sku', 'ID_subcategoria', 'ID_marca', 'descripcion', 'margen_ganancia', 'porcentaje_impuestos', 'vigilar', 'minimo_stock', 'perecedero', 'dias_antes_vencimiento'],
    foranea: {
      ID_subcategoria: {
        tabla: 'subcategoria',
        columnas: ['nombre']
      },
      ID_marca: {
        tabla: 'marca',
        columnas: ['nombre']
      }
    },
    pagina: pagina
  };
  (0, _QueryDatabase["default"])(Query).then(function (response) {
    return res.send(response);
  })["catch"](function (error) {
    return console.log(error);
  });
});
router.post('/productos/eliminar', function (req, res) {
  var sku = req.body.query;
  var Query = {
    tabla: 'producto',
    id: sku
  };
  (0, _DeleteFromDatabase["default"])(Query).then(res.send('OK'))["catch"](res.status(404).end());
});
router.post('/productos/buscar/',
/*#__PURE__*/
function () {
  var _ref2 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee2(req, res) {
    var _req$body4, tabla, busqueda, tipo, pagina, Query;

    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _req$body4 = req.body, tabla = _req$body4.tabla, busqueda = _req$body4.busqueda, tipo = _req$body4.tipo, pagina = _req$body4.pagina;
            Query = {
              tabla: tabla,
              columnas: ['nombre', 'sku', 'ID_subcategoria', 'ID_marca', 'descripcion', 'margen_ganancia', 'porcentaje_impuestos', 'vigilar', 'minimo_stock', 'perecedero'],
              foranea: {
                ID_subcategoria: {
                  tabla: 'subcategoria',
                  columnas: ['nombre']
                },
                ID_marca: {
                  tabla: 'marca',
                  columnas: ['nombre']
                }
              },
              desc: true,
              limite: 10,
              //PAGE: poner esto en el router de buscar
              pagina: pagina || 0
            };
            Query.condiciones = {};
            Query.condiciones[tipo] = busqueda;
            (0, _QueryDatabase["default"])(Query).then(function (response) {
              res.send(JSON.stringify(response));
            })["catch"](function () {
              return res.status(404).end();
            });

          case 5:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function (_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}());
router.post('/productos/sku', function (req, res) {
  var sku = req.body.sku;
  var Query = {
    tabla: 'producto',
    columnas: ['perecedero'],
    condiciones: {
      sku: sku
    }
  };
  (0, _QueryDatabase["default"])(Query).then(function (response) {
    return res.json(response.body[0]);
  })["catch"](function (error) {
    return console.log(error);
  });
});
router.post('/lotes/nuevo', function (req, res) {
  var _req$body$query3 = req.body.query,
      valor = _req$body$query3.valor,
      almacen = _req$body$query3.almacen,
      pasillo = _req$body$query3.pasillo,
      estante = _req$body$query3.estante,
      perecedero = _req$body$query3.perecedero,
      fecha_caducidad = _req$body$query3.fecha_caducidad,
      fecha_ingreso = _req$body$query3.fecha_ingreso,
      sku = _req$body$query3.sku,
      cantidad = _req$body$query3.cantidad;

  if (!perecedero) {
    var x = new Date();
    fecha_caducidad = "".concat(x.getFullYear(), "-").concat(x.getMonth() + 1, "-").concat(x.getDate());
  }

  var Query = {
    tabla: 'lotes',
    costo: valor,
    ID_almacen: almacen,
    pasillo: pasillo,
    estante: estante,
    fecha_caducidad: fecha_caducidad,
    fecha_ingreso: fecha_ingreso,
    sku: sku,
    cantidad: cantidad,
    usernameMov: req.session.user.user
  };
  (0, _AddToDatabase["default"])(Query).then(function () {
    return res.send('OK');
  })["catch"](function (error) {
    return console.log(error);
  });
});
router.post('/lotes/buscar', function (req, res) {
  var _req$body5 = req.body,
      tabla = _req$body5.tabla,
      busqueda = _req$body5.busqueda,
      tipo = _req$body5.tipo,
      pagina = _req$body5.pagina;
  var Query = {
    tabla: tabla,
    columnas: ['id', 'sku', 'cantidad', 'fecha_ingreso', 'costo', 'ID_almacen', 'pasillo', 'fecha_caducidad'],
    foranea: {
      sku: {
        tabla: 'producto',
        columnas: ['nombre']
      },
      ID_almacen: {
        tabla: 'almacen',
        columnas: ['nombre']
      }
    },
    desc: true,
    limite: 10,
    pagina: pagina || 0
  };
  Query.condiciones = {};
  Query.condiciones[tipo] = busqueda;
  Query.condiciones.marcarSalida = '0';
  (0, _QueryDatabase["default"])(Query).then(function (response) {
    res.send(JSON.stringify(response));
  })["catch"](function (error) {
    console.log(error);
    res.status(404).end();
  });
});
router.post('/movimientos/buscar', function (req, res) {
  var _req$body6 = req.body,
      tabla = _req$body6.tabla,
      busqueda = _req$body6.busqueda,
      tipo = _req$body6.tipo,
      pagina = _req$body6.pagina;
  var Query = {
    tabla: tabla,
    columnas: ['id', 'user', 'SKU', 'tipo', 'fecha', 'cantidad'],
    desc: true,
    limite: 10,
    pagina: pagina || 0
  };
  Query.condiciones = {};
  Query.condiciones[tipo] = busqueda;
  (0, _QueryDatabase["default"])(Query).then(function (response) {
    for (var tupla in response.body) {
      var fecha = response.body[tupla].fecha;
      response.body[tupla].fecha = "".concat(fecha.getFullYear(), "-").concat(fecha.getMonth() + 1, "-").concat(fecha.getDate());
    }

    res.send(JSON.stringify(response));
  })["catch"](function (error) {
    console.log(error);
    res.status(404).end();
  });
});
router.post('/movimientos/sumas', function (req, res) {
  console.log(req.body);
  var _req$body7 = req.body,
      filtroFecha = _req$body7.filtroFecha,
      filtroSKU = _req$body7.filtroSKU;
  if (filtroSKU == '') filtroSKU = 'none';
  var obj = {
    filtroFecha: filtroFecha,
    filtroSKU: filtroSKU || 'none'
  };
  (0, _GetMovimientos["default"])(obj).then(function (response) {
    for (var tupla in response.body) {
      var fecha = response.body[tupla].fecha;
      response.body[tupla].fecha = "".concat(fecha.getFullYear(), "-").concat(fecha.getMonth() + 1, "-").concat(fecha.getDate());
    }

    res.send(JSON.stringify(response));
  })["catch"](function (error) {
    console.log(error);
    res.status(404).end();
  });
});
module.exports = router;
//# sourceMappingURL=clientes.js.map