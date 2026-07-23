# Assignment-1-FlyRankAI

Express task API backed by SQLite.

## Stage 5: publish the database project

SQLite was chosen because it is a single file with zero database-server setup,
while still persisting tasks after the Node.js process restarts. The database is
created automatically at `tasks.db` in the project root. It is ignored by Git
so every clone starts with a fresh database and the three seed tasks.

### Run

```bash
npm install
npm start
```

On a clean clone, the first start creates the database and seeds exactly three
tasks. Verify it with:

```bash
curl http://localhost:3000/tasks
```

To inspect the same rows in DB Browser for SQLite, open `tasks.db` and select
the `tasks` table. The query below is the Stage 4 example and shows incomplete
tasks:

```sql
SELECT * FROM tasks WHERE done = 0;
```

Changes made in DB Browser are immediately returned by `GET /tasks` because
both tools read the same SQLite file.

## Stage 4: SQL exploration

The database can be inspected directly with SQLite or DB Browser for SQLite. For
example, this query lists only incomplete tasks:

```sql
SELECT * FROM tasks WHERE done = 0;
```

The API reads the same `tasks.db` file, so changes made with SQL are visible
through `GET /tasks` without synchronizing or restarting the server.

## API

| Method | Endpoint | Success |
| --- | --- | --- |
| GET | `/tasks` | `200` with all tasks |
| GET | `/tasks/:id` | `200` with one task |
| POST | `/tasks` | `201` with the created task |
| PUT | `/tasks/:id` | `200` with the updated task |
| DELETE | `/tasks/:id` | `204` with an empty body |

Unknown task IDs return `404` with `{ "error": "Task not found" }`. Invalid
request bodies return `400` with a JSON error message.
