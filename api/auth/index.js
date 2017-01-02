
import authRoutes from './routes'

export default ({
  api,
  app,
  io,
}) => {
  authRoutes.forEach(route => route({ api, app }))
}
