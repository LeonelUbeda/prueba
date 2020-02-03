"use strict";

require("@babel/polyfill");

var _express = _interopRequireDefault(require("express"));

var _path = _interopRequireDefault(require("path"));

var _expressSession = _interopRequireDefault(require("express-session"));

var _fs = _interopRequireDefault(require("fs"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _InitializeDatabase = _interopRequireDefault(require("./ServerComponents/InitializeDatabase/InitializeDatabase"));

var _CreateConnection = _interopRequireDefault(require("./ServerComponents/CreateConnection/CreateConnection"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var MySQLStore = require('express-mysql-session')(_expressSession["default"]);

var expireTime = 100000000;
(0, _InitializeDatabase["default"])().then(function () {
  var sessionStore = new MySQLStore({
    // Esta configuracion es para la sesiones en el backend
    clearExpired: true,
    // Limpiar los registros de las sesiones ya expiradas
    createDatabaseTable: true,
    // Si no existe la tabla sessions en la base de datos, la crea
    checkExpirationInterval: expireTime,
    // How frequently expired sessions will be cleared; milliseconds:
    expiration: expireTime // The maximum age of a valid session; milliseconds. 

  }, _CreateConnection["default"]); //Configuraciones

  var app = (0, _express["default"])();
  var PORT = process.env.PORT || 5050;
  app.use((0, _expressSession["default"])({
    //Configuracion del express-sessions
    key: 'session_cookie_name',
    secret: 'session_cookie_secret',
    store: sessionStore,
    resave: false,
    cookie: {
      maxAge: expireTime
    },
    // Despues de este tiempo, el cookie va a vencer.
    saveUninitialized: false
  })); //Middlewares

  app.use(_bodyParser["default"].json());
  app.use(_express["default"].urlencoded({
    extended: true
  })); // Permite utilizar el req.

  /* ----- Configuraciones ----- */

  app.use(_express["default"]["static"](_path["default"].join(__dirname, '../public'))); // Al parecer esto no funcionaba  xdd

  /* ----- Configurando handlebars ----- */

  /* ----- Rutas ----- */

  app.use(require('./Routes/index.js'));
  app.use(require('./Routes/clientes.js'));
  app.use(require('./Routes/auth.js'));
  app.use(require('./Routes/clasificacion.js'));
  app.use(require('./Routes/usuarios.js'));
  app.get('*', function (req, res) {
    res.sendFile(_path["default"].join(__dirname, './HtmlFiles/index.html'));
  });
  /* ----- Server Running ----- */

  app.listen(PORT, function () {
    console.log("Servidor montado en el puerto ".concat(PORT));
  });
})["catch"](function (error) {
  console.log(error);
  throw error;
});
//# sourceMappingURL=server.js.map