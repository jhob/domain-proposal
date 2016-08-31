export default function middleware (req, res, next) {
  req.logger = console
  req.metrics = (metric) => console.log('metric:', metric)
  next()
}
