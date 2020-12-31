import c from 'colors'

import Koa from 'koa'

import bodyParser from 'koa-bodyparser'

import cors from '@koa/cors'

import { isProvided } from '@/util/common'

import db from './db'

import router from './route'

import jwt from './middleware/jwt'
import errorHandler from './middleware/errorHandler'

const { PORT_SERVER } = process.env
isProvided({ PORT_SERVER }, 'Env server')

const app = new Koa()

app.use(errorHandler())

app.use(bodyParser())

app.use(cors())

app.use(jwt())

app.use(router.routes())
app.use(router.allowedMethods())

db.authenticate(() => console.warn(c.green('database c onnected')))

app.listen(PORT_SERVER, () => console.warn(c.green('server started')))
