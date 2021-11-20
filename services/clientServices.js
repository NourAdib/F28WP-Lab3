const clientDAO = require('../db/clientDAO');
const bcrypt = require("bcryptjs");

class Client {
    constructor(username, password, num, society, contact, address, zipcode, city, phone, fax, max_outstanding) {
        this.username = username;
        this.password = password;
        this.num = num;
        this.society = society;
        this.contact = contact;
        this.address = address;
        this.zipcode = zipcode;
        this.city = city;
        this.phone = phone;
        this.fax = fax;
        this.max_outstanding = max_outstanding;
    }
}

const loginService = (typedUsername, typedPassword, callback) => {
    //check if the user is in the DB
    clientDAO.findByUsername(typedUsername, function(err, rows) {
        if (err) {
            throw err;
        }
        if (rows.length == 0) {
            //the user is not in the DB
            console.log("Unkown client, Please click to register");
            callback(null, false, null);
        } else {
            //check if password match...
            var num = rows[0].num_client;
            var user = rows[0].username;
            var hash = rows[0].password;
            console.log(`Known user ${num}, ${user}, ${hash}`);
            bcrypt.compare(typedPassword, hash, function(err2, isMatch) {
                if (err2) {
                    throw err2;
                } else if (!isMatch) {
                    console.log("Password doesn't match!");
                    callback(null, true, null);
                } else {
                    console.log("Password matches!");
                    clientDAO.findByNumclient(num, function(err3, rows) {
                        if (err3) {
                            throw err3;
                        }
                        if (rows.length === 1) {
                            let client = new Client(rows[0].num_client, rows[0].society, rows[0].contact, rows[0].addres, rows[0].zipcode, rows[0].city, rows[0].phone, rows[0].fax, rows[0].max_outstanding);
                            callback(null, true, rows);
                        } else {
                            throw err3;
                        }
                    });
                }
            });
        }
    });
};

const registerService = (client, callback) => {

    //check if the user is in the DB
    clientDAO.findByUsername(client.username, function(err, rows) {
        if (err) {
            throw err;
        }
        if (rows.length == 0) {
            //the user is not in the DB
            console.log("New client, try insert");
            //insert user in the DB
            clientDAO.createClient(client, function(err2, affectedRows, insertId) {
                if (err2) {
                    throw err2;
                }
                console.log(`Insertion  from DAO : ${affectedRows}, ${insertId}`);
                if (affectedRows != 0) {
                    console.log(`new client ${insertId}, ${client.username}`);
                    callback(null, false, insertId);
                } else {
                    throw err2;
                }
            });
        } else {
            console.log(`Username exists ${client.username}, ${rows[0].num_client}`);
            callback(null, true, null);
        }
    });
};

const searchService = function(callback) { //to be completed
};

const searchNumclientService = function(num_client, callback) {
    clientDAO.findClientByNumber(num_client, function(err, rows) {
        if (err) {
            throw err;
        } else {
            callback(false, rows);
        }
    });
};

const searchUsernameService = function(username, callback) {
    clientDAO.findByUsername(username, function(err, rows) {
        if (err) {
            throw err;
        } else {
            callback(false, rows);
        }
    });
}

const deleteService = function(num_client, callback) {
    //to be completed
};

module.exports = {
    loginService,
    registerService,
    searchNumclientService,
    searchService,
    deleteService,
    searchUsernameService,
};