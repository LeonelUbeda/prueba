"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _sweetalert = _interopRequireDefault(require("sweetalert2"));

var _axios = _interopRequireDefault(require("axios"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var DeleteElement = function DeleteElement(url, info) {
  return new Promise(function (resolve, reject) {
    _sweetalert["default"].fire({
      title: 'Estas Seguro?',
      text: 'Si este elemento contiene elementos hijos, su unión será borrada',
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Confirmar',
      cancelButtonText: 'Cancelar',
      reverseButtons: true,
      showLoaderOnConfirm: true,
      preConfirm: function preConfirm() {
        return (0, _axios["default"])({
          method: 'post',
          url: url,
          headers: {},
          data: {
            query: info
          }
        }).then(function (response) {
          if (response.status !== 200) {
            throw new Error(response.statusText);
          }

          return true;
        })["catch"](function (error) {
          _sweetalert["default"].showValidationMessage("Ocurri\xF3 un problema. Verifique sus datos e int\xE9ntelo m\xE1s tarde");

          reject(new Error('ERROR'));
          return false;
        });
      },
      allowOutsideClick: function allowOutsideClick() {
        return !_sweetalert["default"].isLoading();
      }
    }).then(function (result) {
      if (result.value) {
        _sweetalert["default"].fire('¡Éxito!', "Se elimino exitosamente.", 'success').then(function () {
          resolve(true);
        });
      }
    });
  });
};

var ToSend = function ToSend(url, info) {
  return new Promise(function (resolve, reject) {
    _sweetalert["default"].fire({
      title: '¿Está seguro?',
      text: "¿Desea ingresar los datos?",
      type: 'question',
      showCancelButton: true,
      confirmButtonText: 'Confirmar',
      cancelButtonText: 'Cancelar',
      reverseButtons: true,
      showLoaderOnConfirm: true,
      preConfirm: function preConfirm() {
        return (0, _axios["default"])({
          method: 'post',
          url: url,
          headers: {},
          data: {
            query: info
          }
        }).then(function (response) {
          if (response.status !== 200) {
            throw new Error(response.statusText);
          } else {
            resolve(response);
          }

          return true;
        })["catch"](function (error) {
          _sweetalert["default"].showValidationMessage("Ocurri\xF3 un problema. Verifique sus datos e int\xE9ntelo m\xE1s tarde");

          reject(new Error('ERROR'));
          return false;
        });
      },
      allowOutsideClick: function allowOutsideClick() {
        return !_sweetalert["default"].isLoading();
      }
    }).then(function (result) {
      if (result.value) {
        _sweetalert["default"].fire('¡Éxito!', "Acci\xF3n ejecutada exitosamente.", 'success').then(function () {
          resolve(true);
        });
      }
    });
  });
};

var ToSendCustom = function ToSendCustom(url, info, mensajeError, MensajeSuccess) {
  return new Promise(function (resolve, reject) {
    _sweetalert["default"].fire({
      title: '¿Está seguro?',
      text: "¿Desea ingresar los datos?",
      type: 'question',
      showCancelButton: true,
      confirmButtonText: 'Confirmar',
      cancelButtonText: 'Cancelar',
      reverseButtons: true,
      showLoaderOnConfirm: true,
      preConfirm: function preConfirm() {
        return (0, _axios["default"])({
          method: 'post',
          url: url,
          headers: {},
          data: {
            query: info
          }
        }).then(function (response) {
          if (response.status !== 200) {
            throw new Error(response.statusText);
          } else {
            resolve(response);
          }

          return true;
        })["catch"](function (error) {
          _sweetalert["default"].showValidationMessage(mensajeError);

          reject(new Error('ERROR'));
          return false;
        });
      },
      allowOutsideClick: function allowOutsideClick() {
        return !_sweetalert["default"].isLoading();
      }
    }).then(function (result) {
      if (result.value) {
        _sweetalert["default"].fire('¡Éxito!', MensajeSuccess, 'success').then(function () {
          resolve(true);
        });
      }
    });
  });
};

var ErrorMsg = function ErrorMsg() {
  _sweetalert["default"].fire({
    type: 'error',
    title: 'Error!',
    text: '¡Hay campos con valores no válidos!'
  });
};

var _default = {
  ToSend: ToSend,
  ErrorMsg: ErrorMsg,
  DeleteElement: DeleteElement,
  ToSendCustom: ToSendCustom
};
exports["default"] = _default;
//# sourceMappingURL=Alertas.js.map