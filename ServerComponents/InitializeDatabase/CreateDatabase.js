"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mysql = _interopRequireDefault(require("mysql"));

var _fs = require("fs");

var _path = require("path");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var CreateDatabase = function CreateDatabase() {
  return new Promise(function (resolve, reject) {
    var connectobj = JSON.parse((0, _fs.readFileSync)((0, _path.join)(__dirname, '../../ServerFiles/dbCredentials.json'))),
        query = "create database if not exists ".concat(connectobj.database, ";");
    delete connectobj.database;

    var connection = _mysql["default"].createPool(connectobj);

    connection.query(query, function (error, results, fields) {
      if (error) {
        reject(error);
      } else {
        resolve(results);
      }
    });
  });
};

var _default = CreateDatabase;
exports["default"] = _default;
//# sourceMappingURL=CreateDatabase.js.map