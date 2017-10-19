import React, { Component } from 'react'
import { StyleSheet, css } from 'aphrodite'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withRouter, Link, Route } from 'react-router-dom'
import { push } from 'react-router-redux'
import { Hover, withHover } from '@react-web/hover'
import IconChart from './icons/IconChart'
import IconPage from './icons/IconPage'
import IconFolder from './icons/IconFolder'
import IconPost from './icons/IconPost'
import IconGlobal from './icons/IconGlobal'
import IconSetting from './icons/IconSetting'
import IconComment from './icons/IconComment'
import IconTheme from './icons/IconTheme'

const noop = () => (null)

class MainNav extends Component {

  state = {
    showNavSites: false
  }

  toggleNavSites = (e) => {
    this.setState({
      showNavSites: !this.state.showNavSites
    })
  }

  renderItem = (props) => {
    const { match } = this.props
    const Icon = props.icon || noop
    let isHover = false
    let isSelected = false
    if (match.url === props.to) {
      isSelected = true
    } else if (props.activePaths && props.activePaths.includes(match.url)) {
      isSelected = true
    } else if (props.isHovered) {
      isHover = true
    }
    
    const handleClick = (e) => {
      if (props.sideLink) {
        this.props.push(props.sideLink)
      } else if (props.onSideClick) {
        props.onSideClick(e)
      }
      e.preventDefault()
      e.stopPropagation()
    }

    return (
      <div className={css(styles.item)}>
        <Link
          to={props.to}
          className={css(
            styles.item__title,
            isSelected && styles.item__title_selected,
            isHover && styles.item__title_hover,
          )}
        >
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <Icon style={{ marginRight: 6 }} fill={
              isSelected ? '#FFF' : isHover ? '#00aadc' : '#87a6bc'
            } />
            {props.title}
          </div>
          {props.sideType === 'LINK' ?
            <div className={css(styles.item__sideBtn, isSelected && styles.item__sideBtn_selected)} onClick={handleClick}>
              {props.sideLabel}
            </div> :
            null
          }
        </Link>
      </div>
    )
  }

  renderNavSites = () => {
    const { sites: { mysites } } = this.props
    return (
      <div>
        {mysites.map(site => (
          <div key={site._id} onClick={this.toggleNavSites}>
            <div>{site.siteName}</div>
          </div>
        ))}
      </div>
    )
  }

  renderHeading = (props) => (
    <div className={css(styles.heading)}>{props.children}</div>
  )

  renderSiteTitle = (props) => (
    <div className={css(styles.siteTitle)}>
      site title
    </div>
  )

  render() {
    const { showNavSites } = this.state

    if (showNavSites) {
      const NavSites = this.renderNavSites
      return (
        <div className={css(styles.nav)}>
          <NavSites />
        </div>
      )
    }

    const Item = withHover(this.renderItem)
    const { match } = this.props
    const Heading = this.renderHeading
    const SiteTitle = this.renderSiteTitle
    return (
      <div className={css(styles.nav)}>
        <div onClick={this.toggleNavSites}>切换站点</div>
        <SiteTitle />
        <Item to={`/stats`} activePaths={['/']} title="统计" icon={IconChart} />
        <Heading>编辑</Heading>
        <Item
          to={`/pages`}
          title="页面"
          icon={IconPage}
          sideLabel="添加"
          sideLink="/pages/new"
          sideType="LINK" />
        <Item
          to={`/posts`}
          title="文章"
          icon={IconPost}
          sideLabel="添加"
          sideLink="/posts/new"
          sideType="LINK"
        />
        <Item to={`/files`} title="文件" icon={IconFolder} />
        <Item to={`/comments`} title="评论" icon={IconComment} />
        <Heading>个性化</Heading>
        <Item to={`/themes`} title="主题" icon={IconTheme} />
        <Heading>配置</Heading>
        <Item to={`/domains`} title="域名" icon={IconGlobal} />
        <Item to={`/settings`} title="设置" icon={IconSetting} />
      </div>
    )
  }
}

const superBlue = '#00aadc'
const styles = StyleSheet.create({
  nav: {
    borderRight: "1px solid #d9e3ea",
    width: 270,
    height: '100%',
    overflowX: 'hidden',
    overflowY: 'auto',
    backgroundColor: '#e9eff3'
  },

  siteTitle: {
    border: '1px solid #d9e3ea',
    borderWidth: '1px 0 1px 0',
    backgroundColor: '#fff',
    height: 65,
  },

  heading: {
    color: '#668eaa',
    fontWeight: '600',
    fontSize: '12px',
    margin: '16px 8px 6px 14px',
    display: 'flex',
  },

  item: {
    height: 46,
  },

  item__title: {
    height: 24,
    lineHeight: '24px',
    color: '#2e4453',
    display: 'block',
    padding: '11px 16px 11px 18px',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },

  item__title_hover: {
    backgroundColor: '#f3f6f8',
    color: superBlue,
  },

  item__title_selected: {
    color: '#fff',
    backgroundColor: "#537994",
  },

  item__sideBtn: {
    display: 'flex',
    position: 'relative',
    alignSelf: 'center',
    boxSizing: 'border-box',
    overflow: 'visible',
    padding: '2px 8px 3px 8px',
    height: '24px',
    marginRight: '8px',
    lineHeight: '18px',
    backgroundColor: '#f3f6f8',
    color: '#4f748e',
    fontSize: '12px',
    fontWeight: '600',
    borderRadius: '3px',
    border: '1px solid #c8d7e1',
    ":hover": {
      color: superBlue,
    }
  },

  item__sideBtn_selected: {
    color: '#2e4453',
    border: '1px solid #415e74',
  }
})

export default withRouter(connect(
  state => ({
    sites: state.sites
  }),
  dispatch => bindActionCreators({
    push
  }, dispatch)
)(MainNav))
