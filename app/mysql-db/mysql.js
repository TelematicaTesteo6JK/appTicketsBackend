const mysql = require('promise-mysql');

// var pool = mysql.createPool({
//   host: 'localhost',
//   user: 'root',
//   password: '',
//   database: 'gestorelecciones',
//   connectionLimit: 10
// });

var pool = mysql.createPool({
  host            : 'localhost',
  connectTimeout  : 60 * 1000,
  aquireTimeout   : 60 * 1000,
  timeout         : 60 * 1000,
  user            : 'root',
  password        : '',
  database        : 'pi',
  connectionLimit : 10
});

function getSqlConnection() {
  return pool.getConnection().disposer(function(connection) {
    pool.releaseConnection(connection);
  });
}
 
module.exports = getSqlConnection;