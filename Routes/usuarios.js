"use strict";

var _QueryDatabase = _interopRequireDefault(require("../ServerComponents/QueryDatabase/QueryDatabase"));

var _CreateConnection = _interopRequireDefault(require("../ServerComponents/CreateConnection/CreateConnection"));

var _AddToDatabase = _interopRequireDefault(require("../ServerComponents/AddToDatabase/AddToDatabase"));

var _UpdateDatabase = _interopRequireDefault(require("../ServerComponents/UpdateDatabase/UpdateDatabase"));

var _GetSchema = _interopRequireDefault(require("../ServerComponents/HandleSchema/GetSchema"));

var _cryptoJs = _interopRequireDefault(require("crypto-js"));

var _DeleteFromDatabase = _interopRequireDefault(require("../ServerComponents/DeleteFromDatabase/DeleteFromDatabase"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var router = require('express').Router();

router.post('/roles/add', function (req, res) {
  console.log(req.body);

  var _req$body$data = _slicedToArray(req.body.data, 5),
      Clasificacion = _req$body$data[0],
      Lotes = _req$body$data[1],
      Productos = _req$body$data[2],
      Reportes = _req$body$data[3],
      Usuarios = _req$body$data[4];

  var nombre = req.body.info.nombre;
  var query = {
    tabla: "roles",
    clasificacion: Clasificacion,
    lotes: Lotes,
    productos: Productos,
    reportes: Reportes,
    nombre: nombre
  };
  (0, _AddToDatabase["default"])(query).then(function () {
    return res.send('OK');
  })["catch"](function (err) {
    console.log(err);
    res.status(404).end();
  });
});
router.post('/roles/edit', function (req, res) {
  var _req$body$data2 = _slicedToArray(req.body.data, 5),
      Clasificacion = _req$body$data2[0],
      Lotes = _req$body$data2[1],
      Productos = _req$body$data2[2],
      Reportes = _req$body$data2[3],
      Usuarios = _req$body$data2[4];

  var _req$body$info = req.body.info,
      nombre = _req$body$info.nombre,
      id = _req$body$info.id;
  var Query = {
    tabla: 'roles',
    id: id,
    clasificacion: Clasificacion,
    lotes: Lotes,
    productos: Productos,
    reportes: Reportes,
    nombre: nombre
  };

  if (id !== 1) {
    (0, _UpdateDatabase["default"])(Query).then(function (response) {
      console.log("Se ha actualizado el registro ".concat(id, " de la tabla Roles"));
      res.send('Actualizado Exitosamente!');
    })["catch"](function (error) {
      console.log(error);
      res.status(404).end();
    });
  } else {
    res.status(404).end();
  }
});
router.post('/usuarios/eliminar', function (req, res) {
  var _req$body$query = req.body.query,
      tabla = _req$body$query.tabla,
      id = _req$body$query.id;
  var Query = {
    tabla: 'usuarios',
    id: id
  };

  if (id != 1) {
    console.log(Query);
    (0, _DeleteFromDatabase["default"])(Query).then(function (response) {
      return res.send('OK');
    })["catch"](function () {
      res.status(404).end();
    });
  } else {
    res.status(404).end();
  }
});
router.post('/usuarios/nuevo', function (req, res) {
  var query = req.body.query;

  var hash = _cryptoJs["default"].SHA256(query.pass);

  query.pass = hash.toString();
  (0, _AddToDatabase["default"])(query).then(function (response) {
    res.send('OK');
  })["catch"](function (error) {
    console.log(error);
  });
});
router.post('/usuarios/editar', function (req, res) {
  var query = req.body.query;
  console.log(query);
  query.tabla = 'usuarios';

  if (query.pass != '') {
    var hash = _cryptoJs["default"].SHA256(query.pass);

    query.pass = hash.toString();
  } else {
    delete query.pass;
  }

  if (!(query.id == 1 && query.ID_rol != 1) || query.id != 1) {
    (0, _UpdateDatabase["default"])(query).then(function (response) {
      console.log('Elemento actualizado!');
      res.send('OK');
    })["catch"](function (error) {
      console.log(error);
      res.status(404).end();
    });
  } else {
    res.status(404).end();
  }
});
router.post('/usuarios/buscar', function (req, res) {
  var _req$body = req.body,
      tabla = _req$body.tabla,
      busqueda = _req$body.busqueda,
      tipo = _req$body.tipo,
      pagina = _req$body.pagina;
  var Query = {
    tabla: tabla,
    columnas: ['nombre', 'id'],
    desc: true,
    pagina: pagina
  };
  (0, _QueryDatabase["default"])(Query).then(function (response) {
    res.json(response);
  })["catch"](function (error) {
    return console.log(error);
  });
}); // Ruta que te responde con todos los usuarios

router.get('/getusers', function (req, res) {
  var Query = {
    tabla: 'usuarios',
    desc: true,
    columnas: ['id', 'name', 'user', 'ID_rol'],
    foranea: {
      ID_rol: {
        tabla: 'roles',
        columnas: ['nombre']
      }
    }
  };

  var schemaFull = (0, _GetSchema["default"])(),
      schema = function (_ref) {
    var usuarios = _ref.usuarios;
    return {
      usuarios: usuarios
    };
  }(schemaFull);

  (0, _QueryDatabase["default"])(Query).then(function (response) {
    response = JSON.stringify({
      users: response,
      schema: schema
    });
    res.json(response);
  })["catch"](function (response) {
    console.log(response);
  });
}); // Ruta que le pasas un id como body, revisa entre todas las sesiones activas si hay alguna con ese id de ese rol.
// Si es asi, borra esa registro o mejor dicho, esa "sesion"

router.post('/resetroles', function (req, res) {
  var id = req.body.id;

  _CreateConnection["default"].query('select * from sessions', function (errror, results, fields) {
    results.forEach(function (elemento, index) {
      var temp = JSON.parse(elemento.data);

      if (temp.ID_rol == id) {
        _CreateConnection["default"].query("DELETE FROM sessions WHERE session_id = '".concat(elemento.session_id, "'"), function (error, results, fields) {
          if (error) throw error;
        });
      }
    });
  });

  res.send('Rol reseteado');
}); // Ruta que te retorna todos los roles existentes

router.get('/getroles', function (req, res) {
  var Query = {
    tabla: 'roles',
    columnas: ['id', 'nombre', 'productos', 'clasificacion', 'lotes', 'reportes', 'administrador']
  };
  (0, _QueryDatabase["default"])(Query).then(function (response) {
    res.send(JSON.stringify(response));
  });
});
module.exports = router;
//# sourceMappingURL=usuarios.js.map