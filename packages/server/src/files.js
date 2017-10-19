const Joi = require('joi')
const { promisify } = require('util')
const formidable = require('formidable')
const path = require('path')

const validate = promisify(Joi.validate)

const filesReducer = (state = defaultState, action) => {
  const { type, payload } = action
  return state
}

const upload = query => async (dispatch, getState) => {
  const { request: req, response: res, session } = getState()
  const { uploadKey = 'file' } = query

  const { files, fields } = await new Promise((resolve, reject) => {
    const form = new formidable.IncomingForm()
    form.encoding = 'utf8'
    form.hash = 'md5'
    form.keepExtensions = true
    form.multiples = true


    form.parse(req)
    form.onPart = function(part) {
      if (!part.filename) {
        // let formidable handle all non-file parts
        form.handlePart(part);
      } else {
        part.addListener('data', function() {
          // ...
        })
      }

    }

    form.parse(req, (err, fields, files) => {
      if (err) return reject(err)
      const filesFile = files[uploadKey]
      if (!filesFile || filesFile.length === 0) return reject(new Error('Upload fail'))
      const fileList = filesFile.length > 0 ? filesFile : [filesFile]
      return resolve({ files: fileList, fields })
    })
  })

  const { db } = getState()
  const file = files[0]
  const result = await db.collection('files').insertOne({
    userId: ObjectId(session.userId),
    fileHash: path.basename(file),
    originUrl: `${process.env.FILE_HOST}/${file.path}`
  })

  return result
}

const deleteFile = query => async (dispatch, getState) => {
  const { fileId } = await validate(query, Joi.object().keys({
    fileId: Joi.string().required(),
  }), { allowUnknown: true })
  const result = await db.collection('files').findOneAndDelete({
    _id: ObjectId(fileId)
  })
  return result
}

const listFiles = query => async (dispatch, getState) => {
  const { after } = await validate(query, Joi.object().keys({
    after: Joi.string(),
  }), { allowUnknown: true })
  const result = await db.collection('files').find({
    _id: ObjectId(fileId)
  }).toArray()
  return result
}

module.exports = module.exports.default = {
  filesReducer,
  upload,
  deleteFile,
  listFiles,
}
