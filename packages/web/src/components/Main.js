import React, { Component } from 'react'
import { StyleSheet, css } from 'aphrodite'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Switch, Route, Link } from 'react-router-dom'
import MainNav from './MainNav'
import Posts from './Posts'
import Themes from './Themes'
import Domains from './Domains'
import Files from './Files'
import Stats from './Stats'

class Main extends Component {

  render() {
    return (
      <div style={{ display: 'flex', flex: 1, height: "100%", backgroundColor: '#f3f6f8' }}>
        <MainNav />
        <div style={{ flex: 1, overflowX: 'hidden', overflowY: 'auto', padding: 20 }}>
          <Switch>
            <Route path={'/stats'} component={Stats} />
            <Route path={'/themes'} component={Themes} />
            <Route path={'/domains'} component={Domains} />
            <Route path={'/posts'} component={Posts} />
            <Route path={'/files'} component={Files} />
            <Route path={'/'} exact component={Stats} />
          </Switch>
        </div>
      </div>
    )
  }
}

export default connect(
  state => ({

  }),
  dispatch => bindActionCreators({

  }, dispatch)
)(Main)

