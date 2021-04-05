import React from 'react'
import './index.scss'
import { Button, Switch } from 'antd'

const ControlsList = props => {
  // switch 事件
  const onChange = checked => {
    props.updateCurState(props.data.id, checked)
  }

  const handleChangeWarnState = props => {
    if (props.data.id === 4) {
      props.updateCurState(props.data.id, !props.data.state)
    }
  }

  return (
    <>
      <div className="icon-box" onClick={() => handleChangeWarnState(props)}>
        {props.data.state ? props.data.onIcon : props.data.offIcon}
      </div>
      <div className="controls-name">
        <span>{props.data.title}</span>
        <span>设备id：{props.data.id}</span>
      </div>
    </>
  )
}

export default ControlsList
