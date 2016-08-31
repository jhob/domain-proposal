export default function ({name}) {
  this.logger.info('Removing product', {name}, this.cache.value)
}
