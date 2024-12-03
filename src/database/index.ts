import 'reflect-metadata'
import { DataSource } from 'typeorm'

export const AppDataSource = new DataSource({
  type: 'sqlite',
  database: 'data.db',
  synchronize: true,
  logging: true,
  entities: [__dirname + '/../models/*.ts'],
  migrations: [],
  subscribers: [],
})

AppDataSource.initialize()
  .then(() => {
    console.log('Data Source initialized!')
  })
  .catch((err) => {
    console.error('Error during initialization', err)
  })

export default AppDataSource
