import api from './api'
import { upload } from './components/file'

const defaultState = {
  list: []
}

const filesReducer = (state = defaultState, action) => {
  const { type, payload } = action
  return state
}

const listFiles = query => async (dispatch, getState) => {
  const result = await api.files.listFiles({})
  if (result.error) return alert(result.error.message)
  dispatch({
    type: '@@files/LIST_UPDATE',
    payload: result.data
  })
}

const uploadFiles = files => async (dispatch, getState) => {
  console.log(files)
  files.forEach(file => {
    const { abort } = upload({
      url: '',
      file: file,
      data: {},
      onProgress: e => { },
      onError: e => { },
      onSuccess: () => {}
    })
  })
}

module.exports = module.exports.default = {
  filesReducer,
  listFiles,
  uploadFiles
}
