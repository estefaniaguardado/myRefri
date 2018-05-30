const express = require('express');
var app = express();

app.set('view engine', 'pug');

app.get('/', function(req, res) {
    res.render('index', { message: 'Hello World!' });
})

app.listen(3000, function() {
    console.log('App is listening in port 3000');
})