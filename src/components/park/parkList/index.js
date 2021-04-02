import React from 'react'
import './index.scss'
import { Switch } from 'antd'

const ParkList = props => {
  const handleSwitchChange = checked => {
    props.updateCurState(props.data.id, checked)
  }

  return (
    <>
      <div className="icon-box">
        {(props.data.onIcon && props.data.id !== 5) || props.data.state
          ? props.data.onIcon
          : props.data.offIcon}
      </div>
      <div className="controls-name">
        <span>{props.data.title}</span>
        <span>设备id：{props.data.id}</span>
      </div>
      <div className="controls-on">
        <span>{props.data.stateText}</span>
      </div>
      <div className="controls-switch">
        <Switch defaultChecked={props.data.state} onChange={handleSwitchChange} />
      </div>
    </>
  )
}

export default ParkList
