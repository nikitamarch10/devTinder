const express = require('express');

const app = express();

// Query Params

// localhost:7777/user?userId=101&name=Nikita
app.get('/user', (req, res) => {
    console.log(req.query);
    res.send("Query Params received: " + JSON.stringify(req.query));
});

// Dynamic Routes- use : to denote dynamic part

// localhost:7777/user/101
app.get('/user/:userId', (req, res) => {
    console.log("Dynamic route: " + req.params.userId);
    res.send("userId: " + JSON.stringify(req.params));
});

//localhost:7777/user/101/nikita/testing
app.get('/user/:userId/:name/:password', (req, res) => {
    console.log(req.params);
    res.send(req.params);
});

app.listen(7777, (req, res) => {
    console.log("Server is listening on port 7777");
});



