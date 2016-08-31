const internalErrorTypes = ['INVALID_ERROR_MESSAGE', 'INVALID_ERROR_TYPE']

export default function domain ({name, actions, errorTypes}) {
  const makeError = ({type, message, details}) => {
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

  return ({logger, metrics}) => {
    const context = {logger, metrics, makeError, cache: {}}
    const boundActions = Object.keys(actions).reduce((out, actionName) => {
      out[actionName] = actions[actionName].bind(context)
      return out
    }, {})
    context.actions = boundActions
    return boundActions
  }
}
