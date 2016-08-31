export default function ({name, price}) {
  if (!name) {
    throw this.makeError({
      type: 'INVALID_ARGUMENTS',
      message: 'name is a required argument'
    })
  }
  if (!price) {
    throw this.makeError({
      type: 'INVALID_ARGUMENTS',
      message: 'price is a required argument'
    })
  }

  this.actions.removeProduct({name})

  this.logger.info('Adding product', {name, price})
}
