import Koa from 'koa'

import jwt from 'jsonwebtoken'

export interface JwtUser {
  id: string
  username: string
}

export interface JwtStore {
  jwt: {
    user: JwtUser
    protect: () => void | never
  }
}

export default (): Koa.Middleware => {
  return async (ctx, next): Promise<void> => {
    const bearer = ctx.request.header.authorization
    const token = bearer && bearer.split(' ')[1]
    ctx.jwt = {}

    try {
      ctx.jwt.user = jwt.verify(token, process.env.JWT_SECRET || 'secret')
    } catch (e) {
      throw Error(e)
    }

    ctx.jwt.protect = (): void | never => {
      if (!ctx.jwt.user) {
        ctx.throw(401, { code: 'auth-01' })
      }
    }
    // console.log('JWT verification', ctx.store.user)

    return next()
  }
}
