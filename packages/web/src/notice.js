import { handleActions } from 'redux-actions'

const initialState = {
  detail: {},
}

export default handleActions({

  NOTICE_PUSH (state, action) {
    const {payload} = action
    return Object.assign({pending: false}, state, {
      detail: payload
    })
  },

}, initialState)


export const showError = (error) => (dispatch, getState) => {
  console.error(error)
  dispatch({
    type: 'NOTICE_PUSH',
    payload: {
      type: 'error',
      error
    }
  })
}
