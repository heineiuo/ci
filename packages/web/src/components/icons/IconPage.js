
import React, { Component } from 'react'

class IconPage extends Component {
  render() {
    const { style = {}, fill = "#87a6bc", size = 24 } = this.props
    return (

      <svg fill={fill} style={style} width={size} height={size}
        viewBox="0 0 512 512">
        <g>
          <path d="M464,0H48C21.49,0,0,21.49,0,48v416c0,26.51,21.49,48,48,48h416c26.51,0,48-21.49,48-48V48C512,21.49,490.51,0,464,0zM480,464c0,8.837-7.163,16-16,16H48c-8.837,0-16-7.163-16-16V160h448V464z M480,128H32V48c0-8.837,7.163-16,16-16h416c8.837,0,16,7.163,16,16V128z" />
          <rect x="64" y="64" width="32" height="32" />
          <rect x="128" y="64" width="32" height="32" />
          <rect x="416" y="64" width="32" height="32" />
          <path d="M96,368h128c8.837,0,16-7.163,16-16V224c0-8.837-7.163-16-16-16H96c-8.837,0-16,7.163-16,16v128C80,360.837,87.163,368,96,368z M112,240h96v96h-96V240z" />
          <path d="M288,368h128c8.837,0,16-7.163,16-16V224c0-8.837-7.163-16-16-16H288c-8.837,0-16,7.163-16,16v128C272,360.837,279.163,368,288,368z M304,240h96v96h-96V240z" />
          <rect x="80" y="400" width="160" height="32" />
          <rect x="272" y="400" width="160" height="32" />
        </g>
      </svg>
    )
  }
}

export default IconPage
