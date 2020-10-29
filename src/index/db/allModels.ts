import { ModelCtor } from 'sequelize-typescript'

function allModels(): ModelCtor[] {
  const r = require.context('@/model', false, /.ts$/)

  const models: ModelCtor[] = []

  r.keys().forEach((key) => {
    models.push(r(key).default)
  })

  return models
}

export default allModels()
