class ForbiddenError extends Error {
  constructor(...args){
    super(...args)
    this.name = 'ForbiddenError'
  }
}

class NotFoundError extends Error {
  constructor(...args){
    super(...args)
    this.name = 'NotFoundError'
  }
}

class NotLoggedError extends Error {
  constructor(...args){
    super(...args)
    this.name = 'NotLoggedError'
    this.message = args[0] || 'Please login first'
  }
}

module.exports = module.exports.default = {
  NotFoundError,
  NotLoggedError,
  ForbiddenError
}
