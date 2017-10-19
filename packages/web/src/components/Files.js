import React, { Component } from 'react'
import { css, StyleSheet } from 'aphrodite'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Link } from 'react-router-dom'
import files from '../files'
import { FileSelector } from './file'

class Files extends Component {

  componentWillMount = () => {
    this.props.listFiles({})
  }

  render() {
    const { match } = this.props
    return (
      <div className={css(styles.list)}>
        <div className={css(styles.header)}>
          <div>
            <Link to={`${match.url}`}>全部</Link>
            <Link to={`${match.url}/images`}>图片</Link>
          </div>
        </div>

        <div className={css(styles.header)}>
          <FileSelector 
            withObjectUrl={true}
            className={css(styles.btn, styles.btn_isCompact)}
            onFileChange={this.props.uploadFiles}
          >添加</FileSelector>
        </div>
      </div>
    )
  }
}

const styles = StyleSheet.create({
  list: {
    margin: '0 auto',
    width: '100%',
    maxWidth: 900,
  },
  header: {
    marginBottom: 16,
    height: 50,
    backgroundColor: '#fff',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '0 10px',
    boxSizing: 'border-box',
    boxShadow: '0 0 0 1px rgba(200, 215, 225, 0.5), 0 1px 2px #e9eff3',
  },
  btn: {
    background: '#fff',
    borderColor: '#c8d7e1',
    borderStyle: 'solid',
    borderWidth: '1px 1px 2px',
    color: '#2e4453',
    cursor: 'pointer',
    display: 'inline-block',
    margin: 0,
    outline: 0,
    overflow: 'hidden',
    fontWeight: 500,
    textOverflow: 'ellipsis',
    textDecoration: 'none',
    verticalAlign: 'top',
    boxSizing: 'border-box',
    fontSize: 14,
    lineHeight: '21px',
    borderRadius: 4,
    padding: '7px 14px 9px',
    appearance: 'none',
    ":hover": {
      borderColor: '#a8bece',
    }
  },
  btn_isCompact: {
    padding: '7px',
    color: '#537994',
    fontSize: 12,
    lineHeight: 1,
  }
})

export default connect(
  state => ({
    session: state.session,
    files: state.files,
  }),
  dispatch => bindActionCreators({
    listFiles: files.listFiles,
    uploadFiles: files.uploadFiles
  }, dispatch)
)(Files)
