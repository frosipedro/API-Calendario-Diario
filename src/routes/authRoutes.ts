import { Router } from 'express'
import * as authService from '../services/authService'

const router = Router()

router.post('/login', authService.login)

export default router
