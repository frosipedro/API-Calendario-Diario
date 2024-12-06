import { Request, Response } from 'express'
import * as taskService from '../services/taskService'

export const getTasks = async (req: Request, res: Response): Promise<any> => {
  try {
    const userId = req.userId as string
    const tasks = await taskService.getTasks(userId)
    res.status(200).json(tasks)
  } catch (error) {
    res.status(404).json({ message: 'Not found' })
  }
}

export const createTask = async (req: Request, res: Response): Promise<any> => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: 'Unauthorized' })
    }
    const userId = req.userId as string
    const taskData = req.body
    const newTask = await taskService.createTask(userId, taskData)
    res.status(201).json(newTask)
  } catch (error) {
    res.status(400).json({ message: 'Bad Request' })
  }
}

export const updateTask = async (req: Request, res: Response): Promise<any> => {
  try {
    if (!req.user) {
      return res.status(400).json({ message: 'Invalid Data' })
    }
    const taskId = parseInt(req.params.taskId)
    const taskData = req.body
    const updatedTask = await taskService.updateTask(taskId, taskData)
    res.status(200).json(updatedTask)
  } catch (error) {
    res.status(404).json({ message: 'Internal server error' })
  }
}

export const deleteTask = async (req: Request, res: Response): Promise<any> => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: 'Unauthorized' })
    }
    const taskId = parseInt(req.params.taskId)
    await taskService.deleteTask(taskId)
    res.status(204).json({ message: 'Task deleted' })
  } catch (error) {
    res.status(404).json({ message: 'Not found' })
  }
}
