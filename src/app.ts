import express from 'express'
import dotenv from 'dotenv'
import taskRoutes from './routes/taskRoutes'
import authRoutes from './routes/authRoutes'
import './utils/seed'

dotenv.config()

const app = express()

app.use(express.json())
app.use('/tasks', taskRoutes)
app.use('/auth', authRoutes)

export default app
