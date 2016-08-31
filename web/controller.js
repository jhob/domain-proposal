import Catalog from '../domain/catalog'

export default function (req, res) {
  const catalog = Catalog({
    logger: req.logger,
    metrics: req.metrics
  })

  try {
    catalog.addProduct({name: 'Oranges', price: 2})
    res.status(200).send('added_product')
  } catch (error) {
    if (error.type === 'INVALID_ARGUMENTS') {
      res.status(503).send('service_unavailable')
    }
  }
}
