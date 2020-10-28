import { Sequelize } from 'sequelize-typescript'

import c from 'clsx'

import { User, UserItem } from '../model/user'

const { DB_NAME, DB_PASSWORD, DB_USERNAME, DB_HOST, DB_PORT } = process.env

if (!DB_NAME || !DB_PASSWORD || !DB_USERNAME || !DB_HOST || !DB_PORT) {
  throw Error(
    `Provide env variables: ${c(
      !DB_NAME && 'DB_NAME',
      !DB_PASSWORD && 'DB_PASSWORD',
      !DB_USERNAME && 'DB_USERNAME',
      !DB_HOST && 'DB_HOST',
      !DB_PORT && 'DB_PORT',
    )}`,
  )
}

// const sequelize = new Sequelize(DB_NAME, DB_USERNAME, DB_PASSWORD, {
//   port: parseInt(DB_PORT, 10),
//   host: DB_HOST,
//   dialect: 'postgres',

// })

const sequelize = new Sequelize({
  database: DB_NAME,
  host: DB_HOST,
  port: parseInt(DB_PORT, 10),
  username: DB_USERNAME,
  password: DB_PASSWORD,
  dialect: 'postgres',
  storage: ':memory:',
  models: [User, UserItem],
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
