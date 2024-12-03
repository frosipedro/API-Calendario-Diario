import { AppDataSource } from '../database/index'
import { Task } from '../models/Task'
import { User } from '../models/User'

export const getTasks = async (userId: string): Promise<Task[]> => {
  const taskRepository = AppDataSource.getRepository(Task)
  return await taskRepository.find({ where: { user: { id: userId } } })
}

export const createTask = async (
  userId: string,
  taskData: Omit<Task, 'id' | 'user'>
): Promise<Task> => {
  const taskRepository = AppDataSource.getRepository(Task)
  const userRepository = AppDataSource.getRepository(User)

  const user = await userRepository.findOneBy({ id: userId })
  if (!user) {
    throw new Error('User not found')
  }

  const task = taskRepository.create({
    ...taskData,
    user,
  })
  console.log(task)

  return await taskRepository.save(task)
}

export const updateTask = async (
  taskId: number,
  taskData: Partial<Omit<Task, 'id' | 'user'>>
): Promise<Task> => {
  const taskRepository = AppDataSource.getRepository(Task)

  const task = await taskRepository.findOneBy({ id: taskId })
  if (!task) {
    throw new Error('Task not found')
  }

  Object.assign(task, taskData)

  return await taskRepository.save(task)
}

export const deleteTask = async (taskId: number): Promise<void> => {
  const taskRepository = AppDataSource.getRepository(Task)
  await taskRepository.delete({ id: taskId })
}
