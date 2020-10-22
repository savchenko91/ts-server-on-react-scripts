import Koa from 'koa'
import test from '@/index/redux/store'

if (!process.env.PORT_SERVER) {
  throw Error(`env variable PORT_SERVER is not defined!`)
}

const app = new Koa()

app.use(async (ctx) => {
  // eslint-disable-next-line no-console
  console.log('A test message on request')
  ctx.body = 'Hello World'
})

// eslint-disable-next-line no-console
console.log('A test message on start')

// eslint-disable-next-line no-console
app.listen(process.env.PORT_SERVER, () => console.log('server started'))
