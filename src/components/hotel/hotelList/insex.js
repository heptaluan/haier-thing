import React from 'react'
import './index.scss'
import { Button } from 'antd'

const HotelList = props => {
  return (
    <>
      <div className="icon-box">
        {props.data.state ? props.data.onIcon : props.data.offIcon}
      </div>
      <div className="controls-name">
        <span>{props.data.title}</span>
        <span>设备id：{props.data.id}</span>
      </div>
    </>
  )
}

export default HotelList
