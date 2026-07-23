# Assignment-1-FlyRankAI

Express task API backed by SQLite.

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
