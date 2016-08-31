import express from 'express'

import middleware from './infra/middleware'
import controller from './web/controller'

const app = express()
app.use(middleware)
app.get('/add_product', controller)

export default app
