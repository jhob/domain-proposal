import * as actions from './actions'
import domain from '../util/domain'
import errorTypes from './error_types'

export default domain({
  name: 'Catalog',
  actions,
  errorTypes
})
