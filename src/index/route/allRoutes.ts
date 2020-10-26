// eslint-disable-next-line @typescript-eslint/no-explicit-any
function allRoutes(): any {
  const r = require.context('@/route', false, /.ts$/)

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const pageRoutes: any = []

  r.keys().forEach((key) => {
    pageRoutes.push(r(key).default)
  })

  return pageRoutes
}

export default allRoutes()
