import React, { Component } from 'react'
import { StyleSheet, css } from 'aphrodite'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Link, withRouter, NavLink, Route } from 'react-router-dom'
import { withHover } from '@react-web/hover'
import pathToRegexp from 'path-to-regexp'

class Header extends Component {

  renderNavLink = (props) => {
    const { routing, routing: { location: { pathname } } } = this.props
    let match = false
    if (!!props.activePath) {
      const re = pathToRegexp(props.activePath)
      if (!!re.exec(pathname)) match = true
    }
    if (pathname === props.to) match = true
    return (
      <Link
        to={props.to}
        className={css(styles.navitem, match && styles.navitem_active)}
      >{props.label}</Link>
    )
  }

  render() {
    const CustomNavLink = withHover(this.renderNavLink)
    const { routing, session } = this.props
    return (
      <div className={css(styles.header)}>
        {/** left **/}
        <div>
          <CustomNavLink to={"/"} activePath={'/:navName(posts|files|stats|pages|comments|domains|settings|themes)*'} label="站点管理" />
        </div>
        {/** right **/}
        <div>
          <CustomNavLink to={"/post"} label="编辑" activePath={'/post/:postId'} />
          {'hi ' + session.username + '!'}
        </div>
      </div>
    )
  }
}

const styles = StyleSheet.create({
  header: {
    position: 'fixed',
    top: 0,
    height: 50,
    boxSizing: 'border-box',
    left: 0,
    right: 0,
    background: '#0087be',
    borderBottom: '1px solid #0079aa',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },

  nav_siteManage: {

  },

  navitem: {
    color: '#fff',
    backgroundColor: 'transparent'
  },

  navitem_active: {
    backgroundColor: '#004967'
  }
})

export default connect(
  state => ({
    routing: state.routing,
    session: state.session
  }),
  dispatch => bindActionCreators({

  }, dispatch)
)(Header)
