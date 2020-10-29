import { Sequelize } from 'sequelize-typescript'

import { isProvided } from '@/util/common'

import models from './allModels'

const { DB_NAME, DB_PASSWORD, DB_USERNAME, DB_HOST, DB_PORT } = process.env

isProvided(
  {
    DB_NAME,
    DB_PASSWORD,
    DB_USERNAME,
    DB_HOST,
    DB_PORT,
  },
  'Env database',
)

const sequelize = new Sequelize({
  database: DB_NAME,
  host: DB_HOST,
  port: parseInt(DB_PORT || '3001', 10),
  username: DB_USERNAME,
  password: DB_PASSWORD,
  dialect: 'postgres',
  storage: ':memory:',
  models,
  logging: false,
})

function authenticate(onSuccess?: () => void): void {
  sequelize
    .authenticate()
    .then(onSuccess)
    .catch((err): void => {
      // eslint-disable-next-line no-console
      console.error('Unable to connect to database:', err)
    })
}

const db = {
  sequelize,
  authenticate,
}

export default db
