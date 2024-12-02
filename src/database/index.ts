import sqlite3 from 'sqlite3'

const db = new sqlite3.Database('data.db', (err) => {
  if (err) {
    console.error('Error opening database', err.message)
  } else {
    console.log('Connected to SQLite database')
    createTables()
  }
})

const createTables = () => {
  // Criação da tabela users
  db.run(
    `CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT NOT NULL,
      email TEXT NOT NULL UNIQUE,
      passwordHash TEXT NOT NULL
    )`,
    (err) => {
      if (err) console.error('Error creating users table:', err.message)
    }
  )

  // Criação da tabela tasks
  db.run(
    `CREATE TABLE IF NOT EXISTS tasks (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      description TEXT,
      status BOOLEAN NOT NULL DEFAULT 0,
      userId INTEGER NOT NULL,
      FOREIGN KEY (userId) REFERENCES users (id)
    )`,
    (err) => {
      if (err) console.error('Error creating tasks table:', err.message)
    }
  )
}

export default db
