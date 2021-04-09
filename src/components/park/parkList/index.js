import React from 'react'
import './index.scss'
import { Switch } from 'antd'

const ParkList = props => {
  const handleSwitchChange = (checked) => {
    props.updateCurState(checked, props.data)
  }

  return (
    <>
      <div className="icon-box">{props.iconList}</div>
      <div className="controls-name">
        <span>{props.data.name}</span>
        <span>设备id：{props.data.id}</span>
      </div>
      <div className="controls-switch">
        <Switch checked={props.data.deviceState === 0 ? false : true} defaultChecked={false} onChange={handleSwitchChange} />
      </div>
    </>
  )
}

export default ParkList
