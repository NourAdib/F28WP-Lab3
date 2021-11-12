const express = require("express"); //Requiring express
const app = express(); //Creating app

//Sending static files as an http response to http GET /
app.use(express.static('public'));
app.set('view engine', 'ejs');
app.get("/", (req, res) => {
    res.render('index');
});

//Make the app listen on port
const port = process.argv[2] || process.env.POR || 3000;
const server = app.listen(port, () => {
    console.log(`Cart app listening a http://localhost:${port}`);
});