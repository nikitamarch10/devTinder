const express = require('express');

const app = express();


app.use('/test', (req, res) => {
    res.send("This is a test route");
});

app.use('/hello', (req, res) => {
    res.send("Hello hello hello!");
});

app.use('/', (req, res) => {
    res.send("Hello from Server");
});


app.listen(7777, (req, res) => {
    console.log("Server is listening on port 7777");
});



