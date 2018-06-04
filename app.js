const express = require('express');

const bodyParser = require('body-parser');

const ItemHandler = require('./ItemHandler');

const itemHandler = new ItemHandler();

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.set('view engine', 'pug');

app.get('/item', (req, res) => {
  res.render('index', { message: 'Hello World!', listOfItems: itemHandler.getList() });
});

app.post('/item', (req, res) => {
  itemHandler.createNewItem(req.body.itemName);
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
