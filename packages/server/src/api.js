const express = require('express')
const bodyParser = require('body-parser')
const { minify } = require('html-minifier')
const lois = require('lois')
const db = require('./db')
const session = require('./session')
const files = require('./files')

const isProd = process.env.NODE_ENV === 'production'

const renderHTML = query => (dispatch, getState) => {

  const { response: res } = getState()
  const siteMeta = {
    globalConstants: [
      { key: '__API_PREFIX', value: isProd ? 'http://cms.youkuohao.com' : 'http://cms.youkuohao.dev:8080' }
    ],
    htmlStyle: '',
    bodyStyle: '',
    title: '',
    description: '',
    author: '',
    reactVersion: '15.5.0',
    preRenderContent: ''
  }

  const htmlOutout = `<!DOCTYPE html>
  <html lang="zh-CN" style="${siteMeta.htmlStyle}">
  <head>
    <meta charset="utf-8">
    <title>${siteMeta.title}</title>
    <meta name="description" content="${siteMeta.description}" />
    <meta name="author" content="${siteMeta.author}" />
    <meta name="viewport" content="initial-scale=1,user-scalable=no,maximum-scale=1,width=device-width">
    <meta name="viewport" content="initial-scale=1,user-scalable=no,maximum-scale=1" media="(device-height: 568px)">
    <meta name="apple-mobile-web-app-title" content="${siteMeta.title}" />
    <meta name="apple-mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
    <meta name="format-detection" content="telephone=no">
    <meta name="HandheldFriendly" content="True">
    <meta http-equiv="cleartype" content="on">
    <meta http-equiv="cache-control" content="no-cache, must-revalidate, post-check=0, pre-check=0" />
    <meta http-equiv="cache-control" content="max-age=0" />
    <meta http-equiv="expires" content="0" />
    <meta http-equiv="expires" content="Tue, 01 Jan 1980 1:00:00 GMT" />
    <meta http-equiv="pragma" content="no-cache" />
  </head>
  <body style="${siteMeta.bodyStyle}">
    <div id="app"></div>
    <script>
      ${siteMeta.globalConstants.map(item => {
      return `window['${item.key}'] = '${item.value}'`
    })}
      ;window.__SYSTEM_CONFIG = {
        "baseUrl": "/",
        "meta": {
          "*.js": {
            "format": "amd"
          }
        },
        "map": {
        }
      }
    </script>
    <script src="https://unpkg.com/babel-polyfill@6.23.0/dist/polyfill.js"></script>
    <script src="https://unpkg.com/react@${siteMeta.reactVersion}/dist/react.js"></script>
    <script src="https://unpkg.com/systemjs@0.20.17/dist/system.js"></script>
    <script src="https://unpkg.com/react-dom@${siteMeta.reactVersion}/dist/react-dom.js"></script>
    <script src="${
    isProd ?
      "http://127.0.0.1:8051/@youkuohao/cis-web/index.js" :
      "http://127.0.0.1:8051/@youkuohao/cis-web/index.js"
    }"></script>
  </body>
  </html>`

  // return htmlOutout
  res.end(minify(htmlOutout, {
    removeAttributeQuotes: true,
    collapseWhitespace: true,
    ignoreCustomComments: true,
    removeComments: true,
    minifyJS: true,
  }))
  return false
}

const api = {
  cms: {
    files: {
      upload: files.upload
    },
  },
  '*': renderHTML,
  '/': renderHTML
}

const apiRouter = express.Router()
apiRouter.use(bodyParser.json())
apiRouter.use((req, res, next) => {
  const store = lois.createStore({
    request: lois.requestReducer,
    response: lois.responseReducer,
    router: lois.routerReducer,
    session: session.sessionReducer,
    db: db.dbReducer,
    posts: posts.postsReducer
  }, {
      request: req,
      response: res,
      router: {
        params: Object.assign({}, req.body, req.query)
      }
    })

  store.dispatch(lois.routerGo(api, (err, data) => {
    if (err) return next(err)
    if (data === false) return false
    return res.json({ data })
  }))
})

module.exports = module.exports.default = {
  apiRouter
}
