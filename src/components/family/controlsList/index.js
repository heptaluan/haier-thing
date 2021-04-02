import React from 'react'
import './index.scss'
import { Button, Switch } from 'antd'

const renderFirstVal = props => {
  switch (props.data.id) {
    case 1:
      return <span>温度：{props.data.firstVal}</span>
    case 2:
      return <span>光照：{props.data.firstVal}</span>
    case 3:
      return <span>{props.data.firstVal}</span>
    case 4:
      return <span>{props.data.state ? '异常' : '正常'}</span>
    case 5:
    case 6:
    case 7:
    case 8:
      return (
        <Button onClick={() => props.updateCurState(props.data.id, true)}>
          {props.data.firstVal}
        </Button>
      )
    default:
      break
  }
}

const renderLasttVal = (props, onChange) => {
  switch (props.data.id) {
    case 1:
      return <span>湿度：{props.data.lastVal}</span>
    case 2:
      return null
    case 3:
      return <Switch defaultChecked={props.data.state} onChange={onChange} />
    case 4:
      return <Switch defaultChecked={props.data.state} onChange={onChange} />
    case 5:
    case 6:
    case 7:
    case 8:
      return (
        <Button onClick={() => props.updateCurState(props.data.id, false)}>
          {props.data.lastVal}
        </Button>
      )
    default:
      break
  }
}

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
      <div className="controls-on">{renderFirstVal(props)}</div>
      <div className="controls-off">{renderLasttVal(props, onChange)}</div>
    </>
  )
}

export default ControlsList
