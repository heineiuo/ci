require('./autoenv')
const express = require('express')
const morgan = require('morgan')
const vhost = require('vhost')
const { apiRouter } = require('./api')

const app = express()

app.use(morgan('dev'))
app.use(vhost(process.env.DASHBOARD_HOST, apiRouter))
app.use(ssrRouter)
app.use((err, req, res, next) => {
  res.json({
    error: {
      code: err.name,
      message: err.message
    }
  })
})
app.use((req, res) => {
  res.json({
    error: {
      code: 'NotFoundError',
      message: 'Not found'
    }
  })
})
app.listen(process.env.HTTP_PORT, () => {
  console.log(`[${new Date()}] Listening on port ${process.env.HTTP_PORT}`)
})
