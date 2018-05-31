const express = require('express');

const ItemHandler = require('./ItemHandler');

const itemHandler = new ItemHandler();

const app = express();
app.set('view engine', 'pug');

app.get('/', (req, res) => {
  res.render('index', { message: 'Hello World!', listOfItems: itemHandler.getList() });
});

app.listen(3000, () => {
  console.log('App is listening in port 3000');
});
