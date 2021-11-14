const database = require('./dbQuery');

function findAll(callback) {
    const selectProducts = "SELECT * from article; ";
    database.getResult(selectProducts, function(err, rows) {
        if (!err) {
            callback(null, rows);
        } else {
            console.log(err);
            throw err;
        }
    });
}

function findByID(reference, callback) {
    const selectProducts = `SELECT * from article where reference like '${reference}';`;
    database.getResult(selectProducts, function(err, rows) {
        if (!err) {
            callback(null, rows);
        } else {
            console.log(err);
            throw err;
        }
    });
}

function findByCategory(category, callback) {
    const selectProducts = (`SELECT * from article where category like '${category}';`);
    database.getResult(selectProducts, function(err, rows) {
        if (!err) {
            callback(null, rows);
        } else {
            console.log(err);
            throw err;
        }
    });
}

module.exports = {
    findAll,
    findByID,
    findByCategory
};