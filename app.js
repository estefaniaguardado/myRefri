const express = require('express');
const app = express();

app.set('view engine', 'pug');

app.get('/', function(req, res) {
    const listOfItems = require('./listOfItems');
    const listItems = new listOfItems([]);
    var list = listItems.create();
    res.render('index', { message: 'Hello World!' });
})

app.listen(3000, function() {
    console.log('App is listening in port 3000');
})