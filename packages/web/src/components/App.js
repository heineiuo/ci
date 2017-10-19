import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { HashRouter, Switch, Route, Link } from 'react-router-dom'
import Loader from '@react-web/async-loader'
import { StyleSheet, css } from 'aphrodite'
import './global.css'
import { getPostList, queryPostDetail } from '../posts'
import Header from './Header'
import Main from './Main'
import PostEditor from './PostEditor'

class App extends Component {

  renderNotFound = () => {
    return (
      <div>404</div>
    )
  }

  render() {
    return (
      <div>
        <Header />
        <div className={css(styles.content)}>
          <HashRouter>
            <Switch>
              <Route path={'/'} exact component={Main} />
              <Route path={'/post/:postId'} component={PostEditor} />
              <Route path={'/post'} component={PostEditor} />
              <Route path={'/:navName(posts|files|stats|pages|comments|domains|settings|themes)*'} component={Main} />
              <Route render={this.renderNotFound} />
            </Switch>
          </HashRouter>
        </div>
      </div>
    )
  }
}

const styles = StyleSheet.create({
  content: {
    position: 'fixed',
    top: 50,
    left: 0,
    right: 0,
    bottom: 0
  }
})

export default connect(
  state => ({
    session: state.session,
    posts: state.posts
  }),
  dispatch => bindActionCreators({
    getPostList,
    queryPostDetail,
  }, dispatch)
)(App)
