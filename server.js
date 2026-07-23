const express = require('express');
const db = require('./database');

const app = express();
const PORT = 3000;

app.use(express.json());

app.get('/api/hello', (req, res) => {
  res.json({
    message: 'Hello, World!',
    status: 'success'
  });
});

app.get('/api/status', (req, res) => {
  res.json({
    service: 'My First API',
    uptime: process.uptime(),
    timestamp: new Date().toISOString()
  });
});

const taskFromRow = (row) => ({
  id: row.id,
  title: row.title,
  done: Boolean(row.done)
});

app.get('/tasks', (req, res) => {
  const tasks = db.prepare('SELECT * FROM tasks').all().map(taskFromRow);
  res.json(tasks);
});

app.get('/tasks/:id', (req, res) => {
  const task = db
    .prepare('SELECT * FROM tasks WHERE id = ?')
    .get(req.params.id);

  if (!task) {
    return res.status(404).json({ error: 'Task not found' });
  }

  res.json(taskFromRow(task));
});

app.post('/tasks', (req, res) => {
  const { title } = req.body;

  if (typeof title !== 'string' || title.trim() === '') {
    return res.status(400).json({ error: 'Title is required' });
  }

  const result = db
    .prepare('INSERT INTO tasks (title, done) VALUES (?, ?)')
    .run(title.trim(), 0);
  const task = db
    .prepare('SELECT * FROM tasks WHERE id = ?')
    .get(result.lastInsertRowid);

  res.status(201).json(taskFromRow(task));
});

app.put('/tasks/:id', (req, res) => {
  const { title, done } = req.body;

  if (
    typeof title !== 'string' ||
    title.trim() === '' ||
    typeof done !== 'boolean'
  ) {
    return res.status(400).json({ error: 'Title and done are required' });
  }

  const result = db
    .prepare('UPDATE tasks SET title = ?, done = ? WHERE id = ?')
    .run(title.trim(), done ? 1 : 0, req.params.id);

  if (result.changes === 0) {
    return res.status(404).json({ error: 'Task not found' });
  }

  const task = db
    .prepare('SELECT * FROM tasks WHERE id = ?')
    .get(req.params.id);
  res.json(taskFromRow(task));
});

app.delete('/tasks/:id', (req, res) => {
  const result = db
    .prepare('DELETE FROM tasks WHERE id = ?')
    .run(req.params.id);

  if (result.changes === 0) {
    return res.status(404).json({ error: 'Task not found' });
  }

  res.status(204).send();
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
