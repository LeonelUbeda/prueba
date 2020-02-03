"use strict";

var HandlePermission = {};

HandlePermission.get = function (username) {
  return new Promise(function (resolve, reject) {
    if (username == null || username == undefined) {
      throw new Error('Error: no se envio un usuario');
    }
  });
};

HandlePermission.check = function () {};

HandlePermission.set = function () {};
//# sourceMappingURL=HandlePermission.js.map