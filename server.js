const express = require('express');
const app = express();
const PORT = 3000;

// Middleware to parse JSON bodies (optional but good practice)
app.use(express.json());

// First JSON endpoint
app.get('/api/hello', (req, res) => {
  res.json({
    message: 'Hello, World!',
    status: 'success'
  });
});

// Second JSON endpoint
app.get('/api/status', (req, res) => {
  res.json({
    service: 'My First API',
    uptime: process.uptime(),
    timestamp: new Date().toISOString()
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
