const database = require('./dbQuery');
const bcrypt = require("bcryptjs");

//select all clients
function find(callback) {
    var rows = null;
    //put your code her to select clients and return the array
    //....
    callback(null, rows);
}

function findByUsername(username, callback) {
    const selectClient = (`SELECT * from account where username like '${username}';`);
    database.getResult(selectClient, function(err, rows) {
        if (!err) {
            callback(null, rows);
        } else {
            console.log(err);
        }
    });
}

function findByNumclient(clientNumber, callback) {
    const selectClient = (`SELECT * from account where num_client like '${clientNumber}';`);
    database.getResult(selectClient, function(err, rows) {
        if (!err) {
            callback(null, rows);
        } else {
            console.log(err);
        }
    });
}

function cryptPassword(pass, callback) {
    //set the complexity of the salt generation
    const saltRounds = 10;
    //generate random salt (to be added to the password to generate random hash)
    bcrypt.genSalt(saltRounds, function(err, salt) {
        if (err) {
            throw err;
        } else {
            //hash the password using the generated salt
            bcrypt.hash(pass, salt, function(err, hash) {
                if (err) {
                    throw err;
                } else {
                    //console.log(`hash -> ${hash}`);
                    //return the computed hash
                    callback(err, hash);
                }
            });
        }
    });
}

function createAccount(num_client, username, password, callback) {
    cryptPassword(password, function(err, hash) {
        console.log(`Hash(${password}) -> ${hash}`);
        const insertAccount = (`INSERT INTO account(num_client, username, password) VALUES(${num_client}, '${username}', '${hash}');`);
        database.getResult(insertAccount, function(err2, result2) {
            if (!err2) {
                callback(null, result2.affectedRows, num_client);
            } else {
                console.log(err2);
                throw err2;
            }
        });
    });
}

function createClient(client, callback) {
    //insert client
    const insertClient = (`INSERT INTO client(society, contact, addres, zipcode, city, phone, fax, max_outstanding) VALUES('${client.society}', '${client.contact}', '${client.address}', '${client.zipcode}', '${client.city}', '${client.phone}', '${client.fax}', ${client.max_outstanding});`);
    database.getResult(insertClient, function(err1, result1) {
        if (!err1) {
            //if no error insert their account
            createAccount(result1.insertId, client.username, client.password, callback);
        } else {
            console.log(err1);
            throw err1;
        }
    });
}

function findClientByNumber(clientNumber, callback) {
    const selectClient = (`SELECT * from client where num_client like '${clientNumber}';`);
    database.getResult(selectClient, function(err, rows) {
        if (!err) {
            callback(null, rows);
        } else {
            console.log(err);
        }
    });
}

module.exports = {
    find,
    findByUsername,
    createClient,
    findByNumclient,
    findClientByNumber,
};