import express from 'express'

import controller from './web/controller'

const app = express()

app.use((req, res, next) => {
  req.logger = console
  req.metrics = (metric) => console.log('metric:', metric)
  next()
})

app.get('/add_product', controller)

export default app
