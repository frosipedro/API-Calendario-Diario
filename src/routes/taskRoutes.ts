import { Router } from 'express'
import * as taskController from '../controllers/taskController'
import { authenticateToken } from '../middlewares/authMiddleware'

const router = Router()

router.use(authenticateToken)
router.get('/tasks', taskController.getTasks)
router.post('/task', taskController.createTask)
router.put('/task/:id', taskController.updateTask)
router.delete('/task/:id', taskController.deleteTask)

export default router
