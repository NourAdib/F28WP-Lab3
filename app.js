const express = require("express"); //Requiring express
const app = express(); //Creating app

//pass requests to the router middleware 
const router = require(__dirname + '/routes/apis');
app.use(router);

app.use(express.static('public')); //File for static pages
app.set('view engine', 'ejs'); //Setting up EJS

//Sending static files as an http response to http GET /
app.get("/", (req, res) => {
    res.render('index'); //Used the EJS file instead of the html 
});

//Render the contacts file in the /contacts route
app.get("/contacts", (req, res) => {
    res.render('contacts');
});

//Render the contacts file in the /api/register route
app.get("/api/register", (req, res) => {
    res.render('register');
});

//Render the contacts file in the /api/login route
app.get("/api/login", (req, res) => {
    res.render('login');
});

//Make the app listen on port
const port = process.argv[2] || process.env.POR || 3000;
const server = app.listen(port, () => {
    console.log(`Cart app listening a http://localhost:${port}`);
});