import { Router } from 'express'
import * as taskController from '../controllers/taskController'
import { authenticateToken } from '../middlewares/authMiddleware'
import { authMiddlewareGET } from '../middlewares/authMiddleware'

const taskRouter = Router()

taskRouter.use(authenticateToken)
taskRouter.get('/tasks', authMiddlewareGET, taskController.getTasks)
taskRouter.post('/task/:userId', taskController.createTask)
taskRouter.put('/task/:userId/:taskId', taskController.updateTask)
taskRouter.delete('/task/:userId/:taskId', taskController.deleteTask)

export default taskRouter
