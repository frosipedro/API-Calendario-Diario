import { Request, Response, NextFunction } from 'express'
import jwt, { JwtPayload } from 'jsonwebtoken'

declare module 'express-serve-static-core' {
  interface Request {
    userId?: string
  }
}

export const authenticateToken: any = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.header('Authorization')?.split(' ')[1]
  if (!token) return res.sendStatus(401)

  jwt.verify(token, process.env.JWT_SECRET!, (err, user) => {
    if (err) return res.sendStatus(403)
    req.user = user as { id: number }
    next()
  })
}

export const authMiddlewareGET = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const token = req.headers.authorization?.split(' ')[1]
  if (!token) {
    res.status(401).json({ message: 'Token não fornecido' })
    return
  }

  const JWT_SECRET = process.env.JWT_SECRET as string

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload
    req.userId = decoded.userId
    next()
  } catch (error) {
    res.status(401).json({ message: 'Token inválido ou expirado' })
  }
}
