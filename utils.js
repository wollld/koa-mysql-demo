
const mysql = require('mysql');
const config = require('./config.js');
console.log(config)
const pool  = mysql.createPool({
	  connectionLimit :config.database.connectionLimit,
	  host     : config.database.host,
	  user     : config.database.user,
	  password : config.database.password,
	  database : config.database.database,
	  port     : config.database.port
});

/**
 * 
 * @param sql 接收的sql语句
 * @param values 接受的参数： 为数组
 */
exports.query = function( sql, values ) {
  return new Promise(( resolve, reject ) => {
    pool.getConnection(function(err, connection) {
      if (err) {
        console.log(err)
        resolve( err )
      } else {
        connection.query(sql, values, ( err, rows) => {
          if ( err ) {
            reject( err )
          } else {
            resolve( rows )
          }
          connection.release()
        })
      }
    })
  })
}
