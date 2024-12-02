import db from '../database'
import { Task } from '../models/task'

export const getTasks = (userId: number): Promise<Task[]> => {
  return new Promise((resolve, reject) => {
    db.all('SELECT * FROM tasks WHERE userId = ?', [userId], (err, rows) => {
      if (err) reject(err)
      resolve(rows as Task[])
    })
  })
}

export const createTask = (
  userId: number,
  task: Omit<Task, 'id'>
): Promise<Task> => {
  return new Promise((resolve, reject) => {
    const { title, description, status } = task
    db.run(
      'INSERT INTO tasks (title, description, status, userId) VALUES (?, ?, ?, ?)',
      [title, description, status, userId],
      function (err) {
        if (err) reject(err)
        resolve({ id: this.lastID, ...task, userId })
      }
    )
  })
}

export const updateTask = (
  taskId: number,
  task: Partial<Task>
): Promise<Task> => {
  return new Promise((resolve, reject) => {
    const fields = Object.keys(task)
      .map((field) => `${field} = ?`)
      .join(', ')
    const values = Object.values(task)
    db.run(
      `UPDATE tasks SET ${fields} WHERE id = ?`,
      [...values, taskId],
      function (err) {
        if (err) reject(err)
        resolve({ id: taskId, ...task } as Task)
      }
    )
  })
}

export const deleteTask = (taskId: number): Promise<void> => {
  return new Promise((resolve, reject) => {
    db.run('DELETE FROM tasks WHERE id = ?', [taskId], function (err) {
      if (err) reject(err)
      resolve()
    })
  })
}
