const express = require('express');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());

const users = [{ id: 1, username: 'admin', password: 'admin123' },
  { id: 2, username: 'admin2', password: 'admin123' },
{ id: 3, username: 'admin3', password: 'admin123' },
{ id: 4, username: 'admin4', password: 'admin123' },
{ id: 4, username: 'admin5', password: 'admin123' },
{ id: 6, username: 'admin6', password: 'admin123' }];

const SECRET = 'SUPER_SECRET_KEY';

app.post('/login', (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username && u.password === password);
  if (!user) return res.status(401).json({ error: 'Invalid credentials' });
  const token = jwt.sign({ userId: user.id }, SECRET, { expiresIn: '1h' });
  res.json({ token });
});

app.listen(5001, () => console.log('Auth Service running on 5001'));
