import bcrypt from 'bcrypt'

export const hashPassword = (password: string): string => {
  try {
    return bcrypt.hashSync(password, 10)
  } catch (error) {
    throw new Error('Error hashing password')
  }
}

export const comparePassword = async (
  password: string,
  hash: string
): Promise<boolean> => {
  try {
    return await bcrypt.compare(password, hash)
  } catch (error) {
    throw new Error('Error comparing passwords')
  }
}
