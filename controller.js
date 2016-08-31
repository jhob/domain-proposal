import Catalog from './catalog'

export default function (req, res) {

  const catalogInterface = Catalog({
    logger: req.logger,
    metrics: req.metrics
  })

  catalogInterface.addProduct({name: 'Oranges', price: 2})

  res.send('added_product')
}
