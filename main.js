import controller from './web/controller'

const req = {
  logger: console,
  metrics: (metric) => console.log('metric:', metric),
}

const res = {
  send: (data) => console.log('sent:', data)
}

controller(req, res)
