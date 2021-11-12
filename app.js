//Requiring express
const express = require("express");

//Creating app
const app = express();

//Make the app listen on port
const port = process.argv[2] || process.env.POR || 3000;
const server = app.listen(port, () => {
    console.log(`Cart app listening a http://localhost:${port}`);
});