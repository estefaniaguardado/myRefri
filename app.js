const express = require('express');

const ItemHandler = require('./ItemHandler');

const itemHandler = new ItemHandler();

const app = express();
app.set('view engine', 'pug');

app.get('/item', (req, res) => {
  res.render('index', { message: 'Hello World!', listOfItems: itemHandler.getList() });
});

app.post('/item', (req, res) => {
  itemHandler.createNewItem('hola');
  res.render('index', { message: 'Hello World!', listOfItems: itemHandler.getList() });
});

app.delete('/item/:id', (req, res) => {
  itemHandler.removeItemOfList(req.params.id);
  res.json({ ok: true });
});

app.listen(3000, () => {
  // TODO: Use `debug` library instead
  console.log('App is listening in port 3000');
});
