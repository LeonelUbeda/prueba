"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _CreateConnection = _interopRequireDefault(require("../CreateConnection/CreateConnection"));

var _fs = _interopRequireDefault(require("fs"));

var _path = _interopRequireDefault(require("path"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/**
 *Funcion que hace una query a la base de datos para obtener una copia del schema en formato json.
 *
 */
var SchemaQuery = function SchemaQuery() {
  return new Promise(function (resolve, reject) {
    //Se crea el string de la query y el objeto de a conexion
    var mysqlQueryColumns = "select TABLE_NAME, COLUMN_NAME, COLUMN_TYPE, DATA_TYPE, CHARACTER_MAXIMUM_LENGTH, NUMERIC_PRECISION, COLUMN_KEY from Information_schema.columns where TABLE_SCHEMA = '".concat(process.db.database, "'"),
        mysqlQueryKeys = "select CONSTRAINT_NAME, TABLE_NAME, COLUMN_NAME, REFERENCED_TABLE_NAME from INFORMATION_SCHEMA.KEY_COLUMN_USAGE where TABLE_SCHEMA = '".concat(process.db.database, "'"),
        connection = _CreateConnection["default"]; // Se realiza la query

    connection.query(mysqlQueryColumns, function (error, results, fields) {
      //Si no hubo error, se hace un objeto schema, donde cada nombre de la tabla es una 
      //propiedad del objeto, y cada columna es una propiedad anidada con el tipo de dato que es.
      if (error) {
        reject(error);
        return null;
      }

      var schema = {};
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = results[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var tupla = _step.value;

          // Si aun no se ha creado la propiedad, se crea
          if (!(tupla.TABLE_NAME in schema)) {
            schema[tupla.TABLE_NAME] = {};
          }

          if (tupla.COLUMN_NAME != 'borrado') {
            //Pone cada propiedad anidada, que corresponde a la columna, con su respectivo tipo
            schema[tupla.TABLE_NAME][tupla.COLUMN_NAME] = {};

            switch (tupla.DATA_TYPE) {
              case 'int':
                schema[tupla.TABLE_NAME][tupla.COLUMN_NAME].tipo = 'int';
                schema[tupla.TABLE_NAME][tupla.COLUMN_NAME].longitud = tupla.NUMERIC_PRECISION;
                break;

              case 'decimal':
                schema[tupla.TABLE_NAME][tupla.COLUMN_NAME].tipo = 'moneda';
                schema[tupla.TABLE_NAME][tupla.COLUMN_NAME].longitud = tupla.NUMERIC_PRECISION;
                break;

              case 'date':
                schema[tupla.TABLE_NAME][tupla.COLUMN_NAME].tipo = 'fecha';
                schema[tupla.TABLE_NAME][tupla.COLUMN_NAME].longitud = 11;
                break;

              case 'tinyint':
                schema[tupla.TABLE_NAME][tupla.COLUMN_NAME].tipo = 'boolean';
                break;

              case 'enum':
                var parsed = tupla.COLUMN_TYPE;
                parsed = parsed.match(/'.+'/)[0];
                parsed = parsed.replace(/'/g, '').split(',');
                schema[tupla.TABLE_NAME][tupla.COLUMN_NAME].valores = parsed;

              case 'varchar':
              case 'char':
                schema[tupla.TABLE_NAME][tupla.COLUMN_NAME].tipo = tupla.DATA_TYPE;
                schema[tupla.TABLE_NAME][tupla.COLUMN_NAME].longitud = tupla.CHARACTER_MAXIMUM_LENGTH;
                break;
            }
          }
        } //Se guarda la ultima vez que se actualizo el schema

      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator["return"] != null) {
            _iterator["return"]();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      schema.lastUpdate = Date.now();
      connection.query(mysqlQueryKeys, function (error, results, fields) {
        var _iteratorNormalCompletion2 = true;
        var _didIteratorError2 = false;
        var _iteratorError2 = undefined;

        try {
          for (var _iterator2 = results[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
            var tupla = _step2.value;

            if (error) {
              reject(error);
              return null;
            }

            if (tupla.CONSTRAINT_NAME == 'PRIMARY') {
              schema[tupla.TABLE_NAME].id = tupla.COLUMN_NAME;
            } else if (tupla.CONSTRAINT_NAME.substr(0, 3) == "FK_") {
              schema[tupla.TABLE_NAME][tupla.COLUMN_NAME].foranea = tupla.REFERENCED_TABLE_NAME;
            }
          } //Se guarda el schema en formato JSON

        } catch (err) {
          _didIteratorError2 = true;
          _iteratorError2 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion2 && _iterator2["return"] != null) {
              _iterator2["return"]();
            }
          } finally {
            if (_didIteratorError2) {
              throw _iteratorError2;
            }
          }
        }

        _fs["default"].writeFile(_path["default"].join(__dirname, '../../ServerFiles/Schema.json'), JSON.stringify(schema), function (err) {
          if (err) {
            reject(err);
            return null;
          }

          ;
        });

        resolve(schema);
      });
    });
  });
};

var _default = SchemaQuery;
exports["default"] = _default;
//# sourceMappingURL=SchemaQuery.js.map