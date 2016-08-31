import Catalog from './domain/catalog'

export default function (req, res) {

  const catalog = Catalog({
    logger: req.logger,
    metrics: req.metrics
  })

  catalog.addProduct({name: 'Oranges', price: 2})

  res.send('added_product')
}
