const express = require('express');

// auth middlewares
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

//----------------------------------------------------------------------------------------------

// multiple route handlers

app.use('/user',
    (req, res, next) => {
        console.log("Inside route handler1");
        next();
        // res.send("Response 1");
    }, 
    (req, res, next) => {
        console.log("Inside route handler2");
        // res.send("Response 2");
        next();
    }, 
    [
        (req, res, next) => {
            console.log("Inside route handler3");
            next();
        },
        (req, res, next) => {
            console.log("Inside route handler4");
            // res.send("Response4");
            next();

        }
    ]
);

app.use('/user', (req, res, next) => {
    console.log("Inside final route handler");
    res.send("Final Response");
    next();

});

app.listen(7777, (req, res) => {
    console.log("Server is listening on port 7777");
});



