process.env.NODE_ENV === 'development'

const env = require('../../config/env')

const { DB_NAME, DB_PASSWORD, DB_USERNAME, DB_HOST, DB_PORT } = process.env

console.log(DB_NAME)

module.exports = {
  development: {
    database: DB_NAME,
    username: DB_USERNAME,
    password: DB_PASSWORD,
    host: DB_HOST,
    port: DB_PORT,
    dialect: 'postgres',
    define: {
      camelCase: true,
    },
  },
}
