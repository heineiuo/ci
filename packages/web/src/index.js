import React, { Component } from 'react'
import * as aphrodite from 'aphrodite'
import * as ReactRouterDOM from 'react-router-dom'
import * as Redux from 'redux'
import * as ReactRedux from 'react-redux'
import * as ReactRouterRedux from 'react-router-redux'
import { HashRouter } from 'react-router-dom'
import { store, history, AppWrapper, injectAsyncReducer } from '@react-web/store'
import ReactModal from 'react-modal'

global.ReactRouterDOM = ReactRouterDOM
global.Redux = Redux
global.ReactRedux = ReactRedux

const moduleMap = [
  { name: 'react', default: global.React },
  { name: 'react-dom', default: global.ReactDOM },
  { name: 'react-router-dom', default: ReactRouterDOM },
  { name: 'react-redux', default: ReactRedux },
  { name: 'react-router-redux', default: ReactRouterRedux },
  { name: 'redux', default: Redux },
  { name: 'react-modal', default: ReactModal },
  { name: 'aphrodite', default: aphrodite },
]

moduleMap.forEach(item => {
  SystemJS.registry.set(
    SystemJS.resolveSync(item.name),
    SystemJS.newModule(item.default)
  )
})

SystemJS.config(global.__SYSTEM_CONFIG)

const posts = require('./posts')
const session = require('./session')
const sites = require('./sites')
const themes = require('./themes')
const files = require('./files')

injectAsyncReducer('session', session.sessionReducer)
injectAsyncReducer('sites', sites.sitesReducer)
injectAsyncReducer('posts', posts.postsReducer)
injectAsyncReducer('files', files.filesReducer)
injectAsyncReducer('themes', themes.themesReducer)

store.dispatch(session.login())

const App = require('./components/App').default

ReactDOM.render(
  <AppWrapper>
    <App />
  </AppWrapper>,
  document.getElementById('app')
)
