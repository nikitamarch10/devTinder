const express = require('express');

const app = express();


app.get('/user', (req, res) => {
    res.send({"firstName": "Nikita", "lastName": "Singh"});
});

app.post('/user', (req, res) => {
    res.send("Data saved successfully");
});

app.delete('/user', (req, res) => {
    res.send("Data deleted successfully");
});

app.put('/user', (req, res) => {
    res.send("Data updated successfully");
});

app.patch('/user', (req, res) => {
    res.send("Data patched successfully");
});


app.use('/test', (req, res) => {
    res.send("This is a test route");
});

app.use('/', (req, res) => {
    res.send("Hello from Server");
});


app.listen(7777, (req, res) => {
    console.log("Server is listening on port 7777");
});



