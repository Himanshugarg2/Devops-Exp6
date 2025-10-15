// order-service/index.js
const express = require('express');
const app = express();
const port = process.env.PORT || 3002;

app.use(express.json());

let orders = [
  { id: 1, userId: 1, item: 'Book' },
  { id: 2, userId: 2, item: 'Laptop' }
];

app.get('/health', (req, res) => res.send({ status: 'ok', service: 'order' }));

app.get('/orders', (req, res) => res.json(orders));
app.get('/orders/:id', (req, res) => {
  const o = orders.find(x => x.id === parseInt(req.params.id));
  if (!o) return res.status(404).json({ error: 'not found' });
  res.json(o);
});

app.post('/orders', (req, res) => {
  const id = orders.length + 1;
  const order = { id, ...req.body };
  orders.push(order);
  res.status(201).json(order);
});

app.listen(port, () => console.log(`Order service listening on ${port}`));
