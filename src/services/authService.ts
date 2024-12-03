import { AppDataSource } from '../database/index'
import { User } from '../models/User'
import bcrypt from 'bcrypt'
import { generateToken } from '../utils/jwt'
import { Request, Response } from 'express'

export const login = async (req: Request, res: Response): Promise<any> => {
  try {
    const { username, password } = req.body

    if (!username || !password) {
      return res
        .status(400)
        .json({ message: 'Username e password são obrigatórios' })
    }

    const userRepository = AppDataSource.getRepository(User)
    const user = await userRepository.findOne({ where: { username } })

    if (!user) {
      return res.status(401).json({ message: 'Usuário ou senha inválidos' })
    }

    const passwordMatch = await bcrypt.compare(password, user.passwordHash)

    if (!passwordMatch) {
      return res.status(401).json({ message: 'Usuário ou senha inválidos' })
    }

    const token = generateToken({ userId: user.id })
    return res.json({ token })
  } catch (error) {
    console.error('Erro no login:', error)
    return res.status(500).json({ message: 'Erro interno do servidor' })
  }
}
