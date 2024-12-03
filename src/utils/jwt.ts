import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()

const secretKey = process.env.JWT_SECRET
if (!secretKey) {
  throw new Error('JWT_SECRET is not defined in environment variables')
}

interface TokenPayload {
  userId: string
  [key: string]: any
}

export const generateToken = (
  payload: TokenPayload,
  expiresIn: string = '1h'
): string => {
  try {
    return jwt.sign(payload, secretKey, { expiresIn })
  } catch (error) {
    throw new Error('Error generating token')
  }
}

export const verifyToken = (token: string): TokenPayload => {
  try {
    return jwt.verify(token, secretKey) as TokenPayload
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      throw new Error('Invalid token')
    }
    if (error instanceof jwt.TokenExpiredError) {
      throw new Error('Token expired')
    }
    throw new Error('Error verifying token')
  }
}
