"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _fs = require("fs");

var _path = require("path");

var ValidateFecha = function ValidateFecha(val) {
  var regExp = new RegExp("^\\d{4}-\\d{2}-\\d{2}$");

  if (!val.match(regExp)) {
    return "no es una fecha valida";
  }

  return '';
};

var ValidateVarChar = function ValidateVarChar(val, length) {
  var regExp = new RegExp("^.{1,".concat(length, "}$"));

  if (!val.match(regExp)) {
    return "debe de tener una longitud de entre 1 y ".concat(length);
  }

  return '';
};

var ValidateChar = function ValidateChar(val, length) {
  var regExp = new RegExp("^.{".concat(length, "}$"));

  if (!val.match(regExp)) {
    return "debe de tener una longitud de ".concat(length);
  }

  return '';
};

var ValidateMoneda = function ValidateMoneda(val, length) {
  if (isNaN(val)) {
    return 'no es un número!';
  }

  if (val < 0) {
    return 'no puede ser negativo!';
  }

  var string = val.toString(),
      regExp = new RegExp("^\\d{1,".concat(length - 2, "}(\\.\\d{1,2})?$"));

  if (!string.match(regExp)) {
    return "no es un monto valido";
  }

  return '';
};

var ValidateInt = function ValidateInt(val, length) {
  if (isNaN(val)) {
    return 'no es un número!';
  }

  if (val < 0) {
    return 'no puede ser negativo!';
  }

  var string = val.toString(),
      regExp = new RegExp("^\\d{1,".concat(length, "}$"));

  if (!string.match(regExp)) {
    return "debe de tener una longitud de 1 y ".concat(length);
  }

  return '';
};

var ValidateInput = function ValidateInput(obj) {
  var error = [];
  var schema = JSON.parse((0, _fs.readFileSync)((0, _path.join)(__dirname, '../../ServerFiles/Schema.json')));

  if (!schema.hasOwnProperty(obj.tabla)) {
    error.push('Esta tabla no existe en el schema!');
    return error;
  }

  obj.idname = schema[obj.tabla].id;
  var respuesta = '',
      valor;

  for (var prop in obj) {
    valor = obj[prop];

    if (prop != 'tabla' && prop != 'id') {
      if (prop == 'idname') {
        prop = obj[prop];
        valor = obj.id;
      }

      if (!schema[obj.tabla].hasOwnProperty(prop)) {
        error.push("La propiedad ".concat(prop, " no existe en el schema"));
      } else {
        switch (schema[obj.tabla][prop].tipo) {
          case 'int':
            respuesta = ValidateInt(valor, schema[obj.tabla][prop].longitud);
            break;

          case 'moneda':
            respuesta = ValidateMoneda(valor, schema[obj.tabla][prop].longitud);
            break;

          case 'fecha':
            respuesta = ValidateFecha(valor, schema[obj.tabla][prop].longitud);
            break;

          case 'char':
            respuesta = ValidateChar(valor, schema[obj.tabla][prop].longitud);
            break;

          case 'varchar':
            respuesta = ValidateVarChar(valor, schema[obj.tabla][prop].longitud);
            break;
        }

        respuesta == '' ? null : error.push("".concat(prop, " ").concat(respuesta));
      }
    }
  }

  ;
  return error;
};

var _default = ValidateInput;
exports["default"] = _default;
//# sourceMappingURL=ValidateInput.js.map