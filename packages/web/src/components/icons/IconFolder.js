import React, { Component } from 'react'

class IconFolder extends Component {
  render() {
    const { style = {}, fill = "#87a6bc", size = 24 } = this.props
    return (

      <svg fill={fill} style={style} width={size} height={size}
        viewBox="0 0 510 510">
        <g>
          <path d="M204,51H51C22.95,51,0,73.95,0,102v306c0,28.05,22.95,51,51,51h408c28.05,0,51-22.95,51-51V153c0-28.05-22.95-51-51-51H255L204,51z" />

        </g>
      </svg>
    )
  }
}

export default IconFolder
