import Router from '@koa/router'

export type JWT = {
  user: {
    id: string
    username: string
  }
  protect: () => void | never
}

export type StateT = {
  jwt: JWT
}

export type Route = {
  method: 'get' | 'post' | 'del' | 'create'
  url: string
  func: Router.Middleware<StateT>
}
