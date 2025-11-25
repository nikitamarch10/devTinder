const express = require('express');
const {userAuth, adminAuth} = require('./middlewares/auth');

const app = express();

app.use('/admin', adminAuth);

app.get('/admin/getAllData', (req, res) => {
    res.send("All Data Sent");
});

app.get('/admin/deleteData', (req, res) => {
    res.send("Data Deleted");
});

app.post('/user/login', (req, res) => {
    res.send("User logged in");
});

app.get('/user/data', userAuth, (req, res) => {
    res.send(" firstName: Nikita")
});

app.listen(7777, (req, res) => {
    console.log("Server is listening on port 7777");
});



