const express = require('express');
const app = express();
const port = 3000;
const fs = require("fs");
const path = require("path");
const cors = require("cors");

app.use(cors());

const recipesFilePath = path.join(__dirname, "recipes.json")

app.get("/", (req, res) => {
    res.send("Hello Couch to Coder peeps, home page here!")
})

app.get("/recipes", (req,res) => {
    fs.readFile(recipesFilePath, "utf-8", (err,data) => {
        const recipes = JSON.parse(data);
        res.json(recipes);
    })
})


app.get('/', (req, res) => {
    res.send('Hello, World! Home page here!');
});

app.get('/recipes', (req, res) => {
    res.send('Hello, World! Sending back all the recipes!');
});

app.post('/recipes', (req, res) => {
    res.send('Hello, World! Recipe accepted, we are storing your favourite dishes');
});

app.listen(port, () => {
    console.log("Server is running on http://localhost: ", port);

});

