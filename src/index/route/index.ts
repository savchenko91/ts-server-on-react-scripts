import Router from '@koa/router'

import allRoutes from './allRoutes'

const router = new Router()

for (let ari = 0; ari < allRoutes.length; ari += 1) {
  const routes = allRoutes[ari]

  for (let ri = 0; ri < routes.length; ri += 1) {
    const route = routes[ri]

    router[route.method as 'get'](route.url, route.func)
  }
}

export default router
