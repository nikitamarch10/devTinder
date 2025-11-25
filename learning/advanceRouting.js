const express = require('express');

const app = express();


app.get(/\/ab?c$/, (req, res) => {
    // $- end with c else abcd also accepts
    res.send("Matches abc or ac");
});

app.get(/\/ab+c$/, (req, res) => {
    res.send("Matches one or more occurrences of b")
});

app.get(/\ab*cd$/, (req, res) => {
    res.send("Matches anything with prefix ab and suffix cd");
});

app.get(/\/a(bc)?d/, (req, res) => {
    res.send("Matches abcd or ad or ad<anything> or abcd<anything>");
});

app.get(/\/a(bc)+d$/, (req, res) => {
    res.send("Matches abcd, abcbcd, abcbcbcd, but no ad");
})

app.get(/\/a$/, (req, res) => {
    res.send("Matches only a");
    // /\/a/ : Matches anything that contains a
});

app.get(/\/fly$/, (req, res) => {
    res.send("Matches only fly");
});

app.get(/\/.fly$/, (req, res) => {
    res.send("Matches any one character before fly");
});

app.get(/\/*fly$/, (req, res) => {
    res.send("Matches zero or more characters before fly");
});


app.listen(7777, (req, res) => {
    console.log("Server is listening on port 7777");
});



