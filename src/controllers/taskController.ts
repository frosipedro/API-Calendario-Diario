import { Request, Response } from 'express'
import * as taskService from '../services/taskService'

export const getTasks = async (req: Request, res: Response): Promise<any> => {
  if (!req.user) {
    return res.status(401).json({ message: 'Unauthorized' })
  }
  const userId = req.user.id
  const tasks = await taskService.getTasks(userId)
  res.json(tasks)
}

export const createTask = async (req: Request, res: Response): Promise<any> => {
  if (!req.user) {
    return res.status(401).json({ message: 'Unauthorized' })
  }
  const userId = req.user.id
  const taskData = req.body
  const newTask = await taskService.createTask(userId, taskData)
  res.status(201).json(newTask)
}

export const updateTask = async (req: Request, res: Response) => {
  const taskId = parseInt(req.params.id)
  const taskData = req.body
  const updatedTask = await taskService.updateTask(taskId, taskData)
  res.json(updatedTask)
}

export const deleteTask = async (req: Request, res: Response) => {
  const taskId = parseInt(req.params.id)
  await taskService.deleteTask(taskId)
  res.status(204).send()
}
