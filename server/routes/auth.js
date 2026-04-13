const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();

const ADMIN = {
  username: 'churchadmin',
  password: 'church2024'
};

router.post('/login', (req, res) => {
  const { username, password } = req.body;
  if (username !== ADMIN.username || password !== ADMIN.password) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }
  const token = jwt.sign({ username }, process.env.JWT_SECRET, { expiresIn: '8h' });
  res.json({ token });
});

module.exports = router;
