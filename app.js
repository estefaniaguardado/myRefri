const express = require('express');

const ItemHandler = require('./ItemHandler');

const itemHandler = new ItemHandler();

const app = express();
app.set('view engine', 'pug');

app.get('/', (req, res) => {
  res.render('index', { message: 'Hello World!', listOfItems: itemHandler.getList() });
});

app.delete('/item/:id', (req, res) => {
  itemHandler.removeItemOfList(parseInt(req.params.id, 10));
  res.json({ ok: true });
});

app.listen(3000, () => {
  // TODO: Use `debug` library instead
  console.log('App is listening in port 3000');
});
