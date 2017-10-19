const fs = require('fs')
const path = require('path')
const Joi = require('joi')
const { promisify } = require('util')
const jsonwebtoken = require('jsonwebtoken')


const { DATA_DIR, JWT_PRIVATE } = process.env
const secret = fs.readFileSync(path.resolve(DATA_DIR, JWT_PRIVATE))
const validate = promisify(Joi.validate)
const jwt = {
  sign: promisify(jsonwebtoken.sign),
  verify: promisify(jsonwebtoken.verify),
  decode: promisify(jsonwebtoken.decode),
}

const defaultState = {
  logged: false,
  checked: false,
}

const sessionReducer = (state = defaultState, action) => {
  const { type, payload } = action
  if (type === '@@session/UPDATE') {
    return Object.assign({}, state, payload, { checked: true })
  }
  return state
}

const session = (query = {}) => async (dispatch, getState) => {
  const state = getState().session
  if (state.checked) return state
  if (!query.token) {
    dispatch({
      type: '@@session/UPDATE',
      payload: { logged: false }
    })
    return { checked: true, logged: false }
  }

  try {
    const decoded = await jwt.verify(query.token, secret)
    const payload = Object.assign({}, decoded, {
      checked: true,
      logged: true
    })
    dispatch({
      type: '@@session/UPDATE',
      payload
    })
    return payload
  } catch (e) {
    dispatch({
      type: '@@session/UPDATE',
      payload: { logged: false }
    })
    return { checked: true, logged: false }
  }
}

module.exports = module.exports.default = {
  session,
  sessionReducer
}
