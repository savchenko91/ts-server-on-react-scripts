import { Route } from '@/index/route/type.d'

const routes: Route[] = [
  {
    method: 'get',
    url: '/auth/login',
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    func: async (ctx): Promise<void> => {
      // eslint-disable-next-line no-console
      console.log('test here', ctx)

      // const { email, password } = ctx.request.body
      // const user = await db.User.findOne({
      //   where: { email: email?.toLowerCase() },
      // })
      // if (!user || !user?.validatePassword(password)) {
      //   ctx.throw({ code: 'auth-00', field: 'email'  })
      // }
      // ctx.body = user?.generateJWT()
    },
  },
]

export default routes
