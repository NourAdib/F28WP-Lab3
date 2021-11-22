const mysql = require('mysql');
const databasename = "sql6440943";

//Variable used to connect to the SQL server
var pool = mysql.createPool({
    connectionLimit: 100,
    host: "sql6.freemysqlhosting.net",
    user: "sql6452232",
    password: "UhaAv69NBi",
    database: "sql6452232",
    debug: true
});

//Query execution
function executeQuery(query, callback) {
    //Establishing database connection
    pool.getConnection(function(err, connection) {
        if (err) {
            return callback(err, null);
        } else if (connection) {
            connection.query(query, function(err, rows, fields) {
                connection.release();
                if (err) {
                    return callback(err, null);
                }
                return callback(null, rows);
            });
        } else {
            return callback(true, "No Connection");
        }
    });
}

//Get the results from the query
function getResult(query, callback) {
    executeQuery(query, function(err, rows) {
        if (!err) {
            callback(null, rows);
        } else {
            callback(true, err);
        }
    });
}

module.exports = {
    getResult
};