"use strict";

var _ResetDatabase = _interopRequireDefault(require("../ServerComponents/InitializeDatabase/ResetDatabase"));

var _QueryDatabase = _interopRequireDefault(require("../ServerComponents/QueryDatabase/QueryDatabase"));

var _SchemaQuery = _interopRequireDefault(require("../ServerComponents/HandleSchema/SchemaQuery"));

var _DefaultDatabase = _interopRequireDefault(require("../ServerComponents/InitializeDatabase/DefaultDatabase"));

var _DeleteFromDatabase = _interopRequireDefault(require("../ServerComponents/DeleteFromDatabase/DeleteFromDatabase"));

var _ValidateInput = _interopRequireDefault(require("../ServerComponents/ValidateInput/ValidateInput"));

var _UpdateDatabase = _interopRequireDefault(require("../ServerComponents/UpdateDatabase/UpdateDatabase"));

var _AddToDatabase = _interopRequireDefault(require("../ServerComponents/AddToDatabase/AddToDatabase"));

var _CreateConnection = _interopRequireDefault(require("../ServerComponents/CreateConnection/CreateConnection"));

var _path = require("path");

var _GenerateSKU = _interopRequireDefault(require("../ServerComponents/GenerateSKU/GenerateSKU"));

var _AddToProduct = _interopRequireDefault(require("../ServerComponents/AddToDatabase/AddToProduct"));

var _UpdateProduct = _interopRequireDefault(require("../ServerComponents/UpdateDatabase/UpdateProduct"));

var _CheckForeigns = _interopRequireDefault(require("../ServerComponents/CheckForeigns/CheckForeigns"));

var _cryptoJs = _interopRequireDefault(require("crypto-js"));

var _GetAlerts = _interopRequireDefault(require("../ServerComponents/GetAlerts/GetAlerts"));

var _GetSchema = _interopRequireDefault(require("../ServerComponents/HandleSchema/GetSchema"));

var _LotesTakeOut = _interopRequireDefault(require("../ServerComponents/LotesTakeOut/LotesTakeOut"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var router = require('express').Router();

var connection = _CreateConnection["default"];
(0, _SchemaQuery["default"])();
router.get('/hola', function (req, res) {});
/* ----- Inicializar Database -----*/

router.get('/db/reset', function (req, res) {
  try {
    (0, _ResetDatabase["default"])();
    res.send('xd');
  } catch (error) {
    console.log(error);
  }
});
router.get('/db/default', function (req, res) {
  (0, _DefaultDatabase["default"])();
  res.send('xd');
});
/* ----- Actualizar Schema ------- */

router.get('/updateschema', function (req, res) {
  UpdateSchema();
  res.send('Good!');
});
/* ----- Prueba ---- */

router.post('/prueba', function (req, res) {
  console.log(req.body); // const test = {
  //   tabla : 'cliente',
  //   nombre : 'cliente1',
  //   telefono : '111',
  //   direccion : 'Casita'
  // }
  // const test = {
  //   tabla: 'subcategoria',
  //   ID_categoria: 2,
  //   nombre: 'NREL',
  //  }

  var obj = {
    sku: '00100100001',
    cantidad: 2
  }; //   const test = {
  //     tabla: 'subcategoria',
  //       desc: true,
  //       columnas: ['nombre','ID_categoria','id'],
  //       foranea: {
  //         ID_categoria: {
  //           tabla: 'categoria',
  //           columnas: ['nombre']
  //         }
  //       },
  //     condiciones : {
  //       ID_categoria: 2 
  //     },
  //     foranea: {
  //       ID_categoria: {
  //         tabla: 'categoria',
  //         columnas: ['nombre', 'ID_categoria']
  //       }
  //     }
  // };

  (0, _LotesTakeOut["default"])(obj).then(function (r) {
    return console.log(r);
  })["catch"](function (e) {
    return console.log('xd');
  }); // const test = {
  //   tabla: ['categoria'],
  //   columnas: ['nombre', 'direccion'],
  //   condiciones: { id: '2'},
  //   columnas: ['nombre', 'id'],
  //   limite: 25
  // }
  // const product = { tabla: 'producto',
  // ID_marca: '2',
  // ID_subcategoria: '2',
  // margen_ganancia: 0,
  // porcentaje_impuestos: 0,
  // nombre: 'asd',
  // descripcion: 'asdasd',
  // vigilar: true,
  // minimo_stock: '0',
  // SKU: '00200200003' }
  //console.log(borrar)
  //DeleteFromDatabase( borrar )
  // QueryDatabase(test)
  // .then((r) => res.json(r))
  // UpdateProduct(product)
  //  .then( response => res.send( response ) )
  //   .catch( response => console.log (response) );
  // res.send(ValidateInput(test));
  // UpdateDatabase ( test )
  // .catch((e)=> console.log(e));
  // GetAlerts( )
  //   .then( response => res.send( response ) )
  //   .catch( response => console.log (response) );
  // HandleSchema().then(ro=> res.send(ro));
});
/* ----- Almacen ----- */

router.post('/getalertas', function (req, res) {
  (0, _GetAlerts["default"])().then(function (r) {
    return res.send(r);
  })["catch"](function (r) {
    return console.log(r);
  });
});
router.get('/almacen/info', function (req, res) {
  var Query = {
    tabla: 'almacen',
    columnas: ['id', 'nombre']
  };

  var schemaFull = (0, _GetSchema["default"])(),
      schema = function (_ref) {
    var almacen = _ref.almacen;
    return {
      almacen: almacen
    };
  }(schemaFull);

  (0, _QueryDatabase["default"])(Query).then(function (almacen) {
    return res.json({
      schema: schema,
      almacen: almacen
    });
  });
});
router.post('/almacen/buscar', function (req, res) {
  var Query = {
    tabla: 'almacen',
    columnas: ['id', 'nombre']
  };
  if (req.body.busqueda != '') Query.condiciones = {
    nombre: req.body.busqueda
  };

  var schemaFull = (0, _GetSchema["default"])(),
      schema = function (_ref2) {
    var almacen = _ref2.almacen;
    return {
      almacen: almacen
    };
  }(schemaFull);

  (0, _QueryDatabase["default"])(Query).then(function (almacen) {
    console.log(almacen);
    res.json({
      schema: schema,
      almacen: almacen
    });
  });
});
router.post('/almacen/buscar', function (req, res) {
  var _req$body = req.body,
      tabla = _req$body.tabla,
      busqueda = _req$body.busqueda,
      tipo = _req$body.tipo,
      pagina = _req$body.pagina;
  var Query = {
    tabla: tabla,
    columnas: ['nombre', 'id'],
    desc: true,
    limite: 10,
    pagina: pagina || 0
  };
  Query.condiciones = {};
  Query.condiciones[tipo] = busqueda;
  (0, _QueryDatabase["default"])(Query).then(function (response) {
    res.send(JSON.stringify(response));
  })["catch"](function () {
    return res.status(404).end();
  });
});
router.post('/salida/sacar', function (req, res) {
  var _req$body$query = req.body.query,
      sku = _req$body$query.sku,
      cantidad = _req$body$query.cantidad;
  var query = {
    sku: sku,
    cantidad: cantidad
  };
  query.user = req.session.user.user;
  (0, _LotesTakeOut["default"])(query).then(function (r) {
    console.log(r);
    res.json(r);
  })["catch"](function (e) {
    console.log(e);
    res.status(404).end();
  });
});
module.exports = router;
//# sourceMappingURL=index.js.map