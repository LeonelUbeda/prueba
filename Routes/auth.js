"use strict";

var _VericarLogin = _interopRequireDefault(require("../AuthComponents/VerificarLogin/VericarLogin"));

var _cryptoJs = _interopRequireDefault(require("crypto-js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var router = require('express').Router();

router.get('/islogged', function (req, res) {
  if (typeof req.session.user !== 'undefined') {
    res.send(true);
  } else {
    res.send(false);
  }
});
router.get('/userinfo', function (req, res) {
  if (typeof req.session !== 'undefined') {
    var permissions = req.session.permissions;
    var user = req.session.user;
    res.send(JSON.stringify({
      permissions: permissions,
      user: user
    }));
  } else {
    res.status(404).end();
  }
});
router.get('/logout', function (req, res, next) {
  req.session.destroy();
  next();
});
router.post('/login', function (req, res) {
  var _req$body = req.body,
      user = _req$body.user,
      pass = _req$body.pass;

  var hash = _cryptoJs["default"].SHA256(pass);

  hash = hash.toString();
  console.log(hash);
  (0, _VericarLogin["default"])(user, hash).then(function (response) {
    return JSON.stringify(response[0]);
  }).then(function (response) {
    return JSON.parse(response);
  }).then(function (response) {
    console.log(response);
    var user = response.user,
        name = response.name,
        productos = response.productos,
        clasificacion = response.clasificacion,
        lotes = response.lotes,
        administrador = response.administrador,
        rol = response.rol,
        ID_rol = response.ID_rol,
        pass = response.pass;
    req.session.permissions = {
      productos: productos,
      clasificacion: clasificacion,
      lotes: lotes,
      administrador: administrador
    }; // Asignando todos los valores al objeto permissions de la sesion

    req.session.ID_rol = ID_rol; // Asignando ID_rol a la session

    req.session.user = {
      user: user,
      name: name,
      pass: pass
    }; // Asignando los valores al objeto user de la sesion
    // Mandando informacion

    res.send(JSON.stringify({
      // Se manda la informacion al frontend para que lo almacene y así según eso realice ciertas acciones
      permissions: {
        // Se manda los permisos del usuario
        productos: productos,
        clasificacion: clasificacion,
        lotes: lotes,
        administrador: administrador,
        rol: rol
      },
      user: {
        // Se manda la información básica del usuario.
        user: user,
        name: name
      }
    }));
  })["catch"](function () {
    return res.status(400).end();
  });
});
router.post('/changepasword', function (req, res) {
  console.log(req.session.user.pass);
});
module.exports = router;
//# sourceMappingURL=auth.js.map