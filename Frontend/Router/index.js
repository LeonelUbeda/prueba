"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _Login = _interopRequireDefault(require("../Secciones/Login.vue"));

var _Inicio = _interopRequireDefault(require("../Secciones/Inicio.vue"));

var _Clasificacion = _interopRequireDefault(require("../Secciones/Clasificacion.vue"));

var _Logout = _interopRequireDefault(require("../Secciones/Logout.vue"));

var _Users = _interopRequireDefault(require("../Secciones/Users.vue"));

var _Products = _interopRequireDefault(require("../Secciones/Products.vue"));

var _store = _interopRequireDefault(require("../Store/store.js"));

var _Lotes = _interopRequireDefault(require("../Secciones/Lotes.vue"));

var _Almacen = _interopRequireDefault(require("../Secciones/Almacen.vue"));

var _Salidas = _interopRequireDefault(require("../Secciones/Salidas.vue"));

var _Reportes = _interopRequireDefault(require("../Secciones/Reportes.vue"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _default = [{
  path: '/',
  component: _Inicio["default"],
  name: 'inicio'
}, {
  path: '/clasificacion',
  component: _Clasificacion["default"],
  beforeEnter: function beforeEnter(to, from, next) {
    return _store["default"].state.Permissions.clasificacion > 1 ? next() : next('/');
  }
}, {
  path: '/login',
  component: _Login["default"],
  name: 'login',
  meta: {
    notAuth: true
  },
  beforeEnter: function beforeEnter(to, from, next) {
    return _store["default"].state.IsLogged == true ? next('/') : next();
  }
}, {
  path: '/usuarios',
  component: _Users["default"],
  name: 'users',
  beforeEnter: function beforeEnter(to, from, next) {
    return _store["default"].state.Permissions.administrador > 1 ? next() : next('/');
  }
}, {
  path: '/productos',
  component: _Products["default"],
  name: 'productos',
  beforeEnter: function beforeEnter(to, from, next) {
    return _store["default"].state.Permissions.productos > 1 ? next() : next('/');
  }
}, {
  path: '/lotes',
  component: _Lotes["default"],
  name: 'lotes',
  beforeEnter: function beforeEnter(to, from, next) {
    return _store["default"].state.Permissions.lotes > 1 ? next() : next('/');
  }
}, {
  path: '/almacen',
  component: _Almacen["default"],
  name: 'almacen',
  beforeEnter: function beforeEnter(to, from, next) {
    return _store["default"].state.Permissions.administrador > 1 ? next() : next('/');
  }
}, {
  path: '/salidas',
  component: _Salidas["default"],
  name: 'salidas',
  beforeEnter: function beforeEnter(to, from, next) {
    return _store["default"].state.Permissions.lotes > 1 ? next() : next('/');
  }
}, {
  path: '/reportes',
  component: _Reportes["default"],
  name: 'reportes',
  beforeEnter: function beforeEnter(to, from, next) {
    return _store["default"].state.Permissions.lotes > 1 ? next() : next('/');
  }
}, {
  path: '/logout',
  component: _Logout["default"]
}];
exports["default"] = _default;
//# sourceMappingURL=index.js.map