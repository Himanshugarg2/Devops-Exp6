// user-service/index.js
const express = require('express');
const app = express();
const port = process.env.PORT || 3001;

app.use(express.json());

let users = [
  { id: 1, name: 'Alice' },
  { id: 2, name: 'Bob' }
];

app.get('/health', (req, res) => res.send({ status: 'ok', service: 'user' }));

app.get('/users', (req, res) => res.json(users));
app.get('/users/:id', (req, res) => {
  const u = users.find(x => x.id === parseInt(req.params.id));
  if (!u) return res.status(404).json({ error: 'not found' });
  res.json(u);
});

app.post('/users', (req, res) => {
  const id = users.length + 1;
  const user = { id, ...req.body };
  users.push(user);
  res.status(201).json(user);
});

app.listen(port, () => console.log(`User service listening on ${port}`));
