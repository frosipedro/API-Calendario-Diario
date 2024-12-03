import 'reflect-metadata'
import express from 'express'
import dotenv from 'dotenv'
import taskRoutes from './routes/taskRoutes'
import authRoutes from './routes/authRoutes'

dotenv.config()

const app = express()

app.use(express.json())
app.use('', authRoutes)
app.use('', taskRoutes)

export default app
