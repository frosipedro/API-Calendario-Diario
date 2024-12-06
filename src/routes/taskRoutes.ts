import { Router } from 'express'
import * as taskController from '../controllers/taskController'
import { authenticateToken } from '../middlewares/authMiddleware'
import { authMiddlewareGET } from '../middlewares/authMiddleware'

const taskRouter = Router()

taskRouter.use(authenticateToken)
taskRouter.get('/tasks', authMiddlewareGET, taskController.getTasks)
taskRouter.post('/task', authMiddlewareGET, taskController.createTask)
taskRouter.put('/task/:taskId', taskController.updateTask)
taskRouter.delete('/task/:taskId', taskController.deleteTask)

export default taskRouter
