import express from 'express'

import auth from './auth'
import authorizedRoutes from './routes/authorized'
import unauthorizedRoutes from './routes/unauthorized'

export default ({ app, io }) => {

  let api = express.Router()

  unauthorizedRoutes.forEach(route => route({ api, io }))

  auth({ app, api, io })

  authorizedRoutes.forEach(route => route({ api, io }))

  return api
}
