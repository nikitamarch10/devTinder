const express = require('express');

const app = express();

// best way to handle errors - try & catch
app.get('/getUserData2', (req, res) => {
    try {
        // logic
        throw new Error("dnfjhgjk");
        res.send("User Data Sent");
    } catch (err) {
          res.status(500).send('Some Error Occurred, please try again later');
    }
});

// ERROR HANDLING using wildcard - below-

app.get('/getUserData', (req, res) => {
    // logic that might trigger an error
    throw new Error("dnfjhgjk"); // eg: database connection failure
    res.send("User Data Sent");
});

// wildcard error handling - always keep it at the end
app.use((err, req, res, next) => {
    if (err) {
        res.status(500).send('Something went wrong');
    }
});

app.listen(7777, (req, res) => {
    console.log("Server is listening on port 7777");
});
