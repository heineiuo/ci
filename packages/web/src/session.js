import { push } from 'react-router-redux'
import AuthSDK from '@youkuohao/auth-sdk'
import sites from './sites'

let auth = null

const initialState = {
  status: 'DEFAULT',
  logged: false,
  username: ''
}

const sessionReducer = (state = initialState, action) => {
  const { type, payload } = action

  if (type === '@@session/STATUS_UPDATE') {
    return Object.assign({}, state, { status: payload.status })
  }

  if (type === '@@session/LOGGED') {
    return Object.assign({}, state, {
      logged: true,
      status: 'READY',
      username: payload.username
    })
  }

  return state
}

const login = () => (dispatch, getState) => {
  auth = new AuthSDK({})
  dispatch({
    type: '@@session/STATUS_UPDATE',
    payload: {
      status: 'PENDING'
    }
  })
  auth.on('tokenChange', async (data) => {
    const { token } = data
    localStorage.__SMILE_TOKEN = token
    const session = await auth.getSession()
    dispatch(sites.getMySites())
    dispatch({
      type: '@@session/LOGGED',
      payload: session
    })
  })
}

const logout = () => async (dispatch, getState) => {
  try {
    if (!auth) return false
    auth.logout()
    auth.destroy()
  } catch (e) {
    console.error(e)
  }
}

export {
  sessionReducer,
  logout,
  login
}
