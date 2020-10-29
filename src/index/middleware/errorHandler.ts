import * as Koa from 'koa'

// import { Error as SequelizeError, ValidationError, ValidationErrorItem, UniqueConstraintError } from 'sequelize'

const errorHandler = (): Koa.Middleware => async (ctx, next): Promise<void> => {
  try {
    await next()
  } catch (err) {
    ctx.body.error = err.toString()

    // BODY
    // if (err instanceof SequelizeError) {
    //   console.log(JSON.stringify(err))
    //   ctx.body = {
    //     name: err.name,
    //     errors: (err as ValidationError).errors.map(({ message, type, path, value }: ValidationErrorItem) => ({
    //       timestamp: new Date(),
    //       status: ctx.status,
    //       type,
    //       message: message.split('%&')[0],
    //       detail: message.split('%&')[1],
    //       field: path,
    //       value,
    //     })),
    //   }
    // }
  }
}

export default errorHandler
