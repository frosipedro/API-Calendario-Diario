import { User } from '../models/User'

export interface taskInterface {
  id: number
  title: string
  description: string
  status: boolean
  dateBegin: Date
  dateEnd: Date
  user: User
}
