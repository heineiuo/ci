import React, { Component } from 'react'
import { StyleSheet, css } from 'aphrodite'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Switch, Route, Link } from 'react-router-dom'
import { RadialChart } from 'react-vis'
import 'react-vis/dist/style.css'

class Stats extends Component {

  render() {
    return (
      <div>
        <RadialChart
          innerRadius={100}
          radius={140}
          data={[
            { angle: 2 },
            { angle: 6 },
            { angle: 2 },
            { angle: 3 },
            { angle: 1 }
          ]}
          width={300}
          height={300}
        />
      </div>
    )
  }
}

export default connect(
  state => ({

  }),
  dispatch => bindActionCreators({

  }, dispatch)
)(Stats)

