const express = require('express');

const bodyParser = require('body-parser');

const debug = require('debug')('http');

const ItemHandler = require('./ItemHandler');

const itemHandler = new ItemHandler();

const Item = require('./model/Item');

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.set('view engine', 'pug');

app.get('/item', (req, res) => {
  res.render('index', { message: 'Hello World!', listOfItems: itemHandler.getList() });
});

app.post('/item', (req, res) => {
  const itemId = Math.random().toString(36).substring(2, 5);
  const newItem = new Item(itemId, req.body.itemName);

  itemHandler.createNewItem(newItem);
  res.render('index', { message: 'Hello World!', listOfItems: itemHandler.getList() });
});

app.put('/item/:id', (req, res) => {
  const modifiedItem = new Item(req.params.id, req.body.name);

  itemHandler.modifyItem(modifiedItem);

  if (req.accepts('application/json')) {
    return res.json({ ok: true });
  }

  return res.render('index', { message: 'Hello World!', listOfItems: itemHandler.getList() });
});

app.delete('/item/:id', (req, res) => {
  itemHandler.removeItemOfList(req.params.id);

  if (req.accepts('application/json')) {
    return res.json({ ok: true });
  }

  return res.render('index', { message: 'Hello World!', listOfItems: itemHandler.getList() });
});

app.listen(3000, () => {
  debug('App is listening in port 3000');
});
