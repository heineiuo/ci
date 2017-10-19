const { MongoClient } = require('mongodb')

class MongoGraph {
  constructor(url) {
    MongoClient.connect(url, {
      reconnectTries: Infinity
    }).then(db => {
      this._db = db
    }).catch(e => {
      console.log(e)
    })
  }

  collection (...args) {
    if (!this._db) throw new Error('Not connected')
    return this._db.collection(...args)
  }
}

const db = new MongoGraph(process.env.MONGODB_URL, {
  reconnectTries: Infinity
})

const dbReducer = (state = db, action) => {
  return state
}

module.exports = module.exports.default = {
  dbReducer
}
