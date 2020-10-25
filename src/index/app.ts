import Koa from 'koa'

import db from './db'

if (!process.env.PORT_SERVER) {
  throw Error(`env variable PORT_SERVER is not defined!`)
}

db.authenticate()

const app = new Koa()

app.use(async (ctx) => {
  // eslint-disable-next-line no-console
  console.log('A test message on request')
  ctx.body = 'Hello World'
})

// eslint-disable-next-line no-console
// console.log(process.env.DB_NAME)

// eslint-disable-next-line no-console
app.listen(process.env.PORT_SERVER, () => console.log('server started'))
