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

const loginControl = (request, response) => {
    const clientServices = require('../services/clientServices');
    console.log(request.body.username);
    console.log(request.body.password);
    let username = request.body.username;
    let password = request.body.password;
    if (!username || !password) {
        response.render('failedLogin', { username: `Login failed, please try again` });
    } else {
        if (request.session && request.session.user) {
            response.render('postLogin', { username: username });
        } else {
            clientServices.loginService(username, password, function(err, dberr, client) {
                console.log("Client from login service :" + JSON.stringify(client));
                if (client === null) {
                    response.render('failedLogin', { username: `Login failed, please try again` });
                } else {
                    console.log("User from login service :" + client[0].num_client);
                    //add to session
                    request.session.user = username;
                    request.session.num_client = client[0].num_client;
                    request.session.admin = false;
                    response.render('postLogin', { username: username });
                }
            });
        }
    }
};


const registerControl = (request, response) => {
    const clientServices = require('../services/clientServices');

    let username = request.body.username;
    let password = request.body.passwsord;
    let society = request.body.society;
    let contact = request.body.contact;
    let address = request.body.address;
    let zipcode = request.body.zipcode;
    let city = request.body.city;
    let phone = request.body.phone;
    let fax = request.body.fax;
    let max_outstanding = request.body.max_outstanding;
    let client = new Client(username, password, 0, society, contact, address, zipcode, city, phone, fax, max_outstanding);

    clientServices.registerService(client, function(err, exists, insertedID) {
        console.log("User from register service :" + insertedID);
        if (exists) {
            console.log("Username taken!");
            response.render('postRegister', { message: `Registration failed. Username "${username}" already taken!` });
            //response.send(`registration failed. Username (${username}) already taken!`); //invite to register
        } else {
            client.num_client = insertedID;
            console.log(`Registration (${username}, ${insertedID}) successful!`);
            response.render('postRegister', { message: `Successful registration ${username}!` });
            //response.send(`Successful registration ${client.contact} (ID.${client.num_client})!`);
        }
        response.end();
    });
};

const getClients = (request, response) => {
    const clientServices = require('../services/clientServices');
    clientServices.searchService(function(err, rows) {
        response.json(rows);
        response.end();
    });
};

const getClient = (request, response) => {
    const clientServices = require('../services/clientServices');
    let username = request.params.username;
    let num_client;

    clientServices.searchUsernameService(username, function(err, rows) {
        num_client = rows[0].num_client
        clientServices.searchNumclientService(num_client, function(err, rows) {
            console.log(rows)
            response.render('clientDetails', {
                username: username,
                clientNumber: rows[0].num_client,
                society: rows[0].society,
                contact: rows[0].contact,
                address: rows[0].addres,
                zipcode: rows[0].zipcode,
                city: rows[0].city,
                phone: rows[0].phone,
                fax: rows[0].fax,
                maxOutstanding: rows[0].max_outstanding,
            });
            //let client = new Client(rows[0].num_client, rows[0].society, rows[0].contact, rows[0].addres, rows[0].zipcode, rows[0].city, rows[0].phone, rows[0].fax, rows[0].max_outstanding);
        });
    });

};

module.exports = {
    loginControl,
    registerControl,
    getClients,
    getClient
};