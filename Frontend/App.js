"use strict";

var _index = _interopRequireDefault(require("./Router/index.js"));

var _App = _interopRequireDefault(require("./App.vue"));

require("babel-polyfill");

var _vue = _interopRequireDefault(require("vue"));

var _vueRouter = _interopRequireDefault(require("vue-router"));

var _axios = _interopRequireDefault(require("axios"));

var _store = _interopRequireDefault(require("./Store/store.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

_vue["default"].use(_vueRouter["default"]);

var router = new _vueRouter["default"]({
  routes: _index["default"],
  mode: 'history'
});

var getUserInfo =
/*#__PURE__*/
function () {
  var _ref = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee() {
    var info, _info$data, permissions, user;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return (0, _axios["default"])('/userinfo');

          case 3:
            info = _context.sent;
            // Pide la informacion almacenada en la sesion del backend.
            _info$data = info.data, permissions = _info$data.permissions, user = _info$data.user; // Extrae la informacion de los datos recibidos.

            return _context.abrupt("return", {
              permissions: permissions,
              user: user
            });

          case 8:
            _context.prev = 8;
            _context.t0 = _context["catch"](0);
            console.log(_context.t0);

          case 11:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 8]]);
  }));

  return function getUserInfo() {
    return _ref.apply(this, arguments);
  };
}();

router.beforeEach(
/*#__PURE__*/
function () {
  var _ref2 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee2(to, from, next) {
    var response, _response, _ref3, permissions, user;

    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            if (!_store["default"].state.IsLogged) {
              _context2.next = 8;
              break;
            }

            _context2.next = 3;
            return (0, _axios["default"])('/islogged');

          case 3:
            response = _context2.sent;

            if (response.data == false) {
              _store["default"].state.IsLogged = false;
              next('/login');
            }

            next();
            _context2.next = 31;
            break;

          case 8:
            _context2.prev = 8;
            _context2.next = 11;
            return (0, _axios["default"])('/islogged');

          case 11:
            _response = _context2.sent;

            if (!(_response.data == true)) {
              _context2.next = 25;
              break;
            }

            _context2.next = 15;
            return getUserInfo();

          case 15:
            _ref3 = _context2.sent;
            permissions = _ref3.permissions;
            user = _ref3.user;
            _store["default"].state.User = user; // La almacena en las variables 

            console.log(_store["default"].state.User);
            _store["default"].state.Permissions = permissions; // temporales globales.

            _store["default"].state.IsLogged = true; // Y existe una sesion.\

            next();
            _context2.next = 26;
            break;

          case 25:
            if (to.matched.some(function (record) {
              return record.meta.notAuth;
            })) {
              // Si en la ruta existe el meta de meta notAuth y si este es verdadero...
              next();
            } else {
              // De otra forma...
              next('/login'); // Lo redirige a '/login'
            }

          case 26:
            _context2.next = 31;
            break;

          case 28:
            _context2.prev = 28;
            _context2.t0 = _context2["catch"](8);
            console.log(_context2.t0);

          case 31:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[8, 28]]);
  }));

  return function (_x, _x2, _x3) {
    return _ref2.apply(this, arguments);
  };
}());
new _vue["default"]({
  render: function render(h) {
    return h(_App["default"]);
  },
  router: router,
  store: _store["default"]
}).$mount('#main');
//# sourceMappingURL=App.js.map