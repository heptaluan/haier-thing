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
      <div className="controls-on">
        <Button onClick={() => props.updateCurState(props.data.id, true)}>{props.data.firstVal}</Button>
      </div>
      <div className="controls-switch">
        <Button onClick={() => props.updateCurState(props.data.id, false)}>{props.data.lastVal}</Button>
      </div>
    </>
  )
}

export default HotelList
