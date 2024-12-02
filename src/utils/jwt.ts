import jwt from 'jsonwebtoken'

const secretKey = process.env.JWT_SECRET!

export const generateToken = (
  payload: object,
  expiresIn: string = '1h'
): string => {
  return jwt.sign(payload, secretKey, { expiresIn })
}

export const verifyToken = (token: string): object | string => {
  try {
    return jwt.verify(token, secretKey)
  } catch (err) {
    throw new Error('Invalid token')
  }
}
