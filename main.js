import controller from './controller'

const req = {
  logger: console,
  metrics: (metric) => console.log('metric:', metric),
}

const res = {
  send: (data) => console.log('sent:', data)
}

controller(req, res)
