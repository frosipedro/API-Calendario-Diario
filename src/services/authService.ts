import { users } from '../models/user'
import bcrypt from 'bcrypt'
import { generateToken } from '../utils/jwt'

export const login = (req: any, res: any) => {
  const { username, password } = req.body
  const user = users.find((user) => user.username === username)

  if (!user || !bcrypt.compareSync(password, user.passwordHash)) {
    return res.status(401).json({ message: 'Invalid credentials' })
  }

  const token = generateToken({ id: user.id })
  res.json({ token })
}
