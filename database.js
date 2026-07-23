const path = require('path');
const Database = require('better-sqlite3');

const db = new Database(path.join(__dirname, 'tasks.db'));

db.exec(`
  CREATE TABLE IF NOT EXISTS tasks (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    done INTEGER NOT NULL DEFAULT 0 CHECK (done IN (0, 1))
  )
`);

const taskCount = db.prepare('SELECT COUNT(*) AS count FROM tasks').get().count;

if (taskCount === 0) {
  const seedTask = db.prepare('INSERT INTO tasks (title, done) VALUES (?, ?)');
  const seedTasks = db.transaction(() => {
    seedTask.run('Learn SQLite', 0);
    seedTask.run('Connect the API to the database', 0);
    seedTask.run('Test persistent data', 0);
  });

  seedTasks();
}

module.exports = db;
