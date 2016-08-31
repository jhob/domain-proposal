const internalErrorTypes = ['INVALID_ERROR_MESSAGE', 'INVALID_ERROR_TYPE']


function bindActions (actions, context) {
  return Object.keys(actions).reduce((out, actionName) => {
    out[actionName] = actions[actionName].bind(context)
    return out
  }, {})
}

function getMakeError(name, errorTypes) {
  return function makeError ({type, message, details}) {
    if (errorTypes.indexOf(type) === -1 && internalErrorTypes.indexOf(type) === -1) {
      throw makeError({
        type: 'INVALID_ERROR_TYPE',
        message: `${type} is not a registered error type for domain: ${name}.`
      })
    }
    if (typeof message !== 'string' || !message.length) {
      throw makeError({
        type: 'INVALID_ERROR_MESSAGE',
        message: `${type} error message must be a non-empty string.`
      })
    }
    const error = new Error(message)
    error.type = type
    error.details = details
    error.message = message
    return error
  }
}

const stubs = {}

function getStubbedInterface(name, errorTypes, actionNames, overrides) {
  const out = {}
  for (let actionName of actionNames) {
    if (actionName in overrides) {
      const override = overrides[actionName]
      if (override && override._isStubbedError) {
        out[actionName] = () => { throw override(name, errorTypes) }
      } else {
        out[actionName] = () => overrides[actionName]
      }
    } else {
      out[actionName] = () => {
        throw new Error(`${name}#${actionName} has been stubbed without being mocked`)
      }
    }
  }
  return out
}

export default function registerDomain ({name, actions, errorTypes}) {
  return ({logger, metrics}) => {
    if (stubs[name]) {
      return getStubbedInterface(name, errorTypes, Object.keys(actions), stubs[name])
    } else {
      const context = {
        cache: {},
        logger,
        makeError: getMakeError(name, errorTypes),
        metrics
      }
      context.actions = bindActions(actions, context)
      Object.freeze(context)
      return context.actions
    }
  }
}

export function stubDomain (name, actionOverrides) {
  stubs[name] = actionOverrides
  const unstub = () => {
    delete stubs[name]
  }
  return unstub
}

export function stubError ({type, message, details}) {
  const out = (name, errorTypes) => {
    const makeError = getMakeError(name, errorTypes)
    return makeError({type, message, details})
  }
  out._isStubbedError = true
  return out
}
