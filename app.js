const express = require('express');

const ItemHandler = require('./ItemHandler');
const itemHandler = new ItemHandler();

const app = express();
app.set('view engine', 'pug');

app.get('/', function(req, res) {
    res.render('index', { message: 'Hello World!', 
                          listOfItems: itemHandler.getList() });
});

app.listen(3000, function() {
    console.log('App is listening in port 3000');
});
