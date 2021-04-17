import React from 'react'
import './index.scss'
import { Button, Switch } from 'antd'

const renderFirstVal = props => {
  switch (props.data.classId) {
    case 16:
      return <span>湿度：{JSON.parse(props.data.latestData.value).value}</span>
    case 14:
      return <span>光照：{JSON.parse(props.data.latestData.value).value}</span>
    case 15:
      return <span>温度：{JSON.parse(props.data.latestData.value).value}</span>
    // case 3:
      // return <span>正常</span>
    // case 10:
      // return <span>正常</span>
    case 8:
    case 11:
    case 19:
      return (
        <Button
          onClick={() =>
            props.updateCurState(
              props.data.id,
              props.data.operations.find(item => item.operation_type === 0).id,
              false
            )
          }
        >
          {
            props.data.operations.find(item => item.operation_type === 0)
              .operation_name
          }
        </Button>
      )
    default:
      break
  }
}

const renderLasttVal = (props, onChange) => {
  switch (props.data.classId) {
    case 16:
    case 14:
    case 15:
      return null
    case 3:
    case 10:
      return <Switch checked={props.data.deviceState === 0 ? false : true} defaultChecked={false} onChange={onChange} />
    case 8:
    case 11:
    case 19:
      return (
        <Button
          onClick={() =>
            props.updateCurState(
              props.data.id,
              props.data.operations.find(item => item.operation_type === 1).id,
              false
            )
          }
        >
          {
            props.data.operations.find(item => item.operation_type === 1)
              .operation_name
          }
        </Button>
      )
    default:
      break
  }
}

const renderIcon = props => {
  if (props.data.deviceState === 0) {
    return props.iconList[props.data.classId].off
      ? props.iconList[props.data.classId].off
      : null
  } else if (props.data.deviceState === 1) {
    return props.iconList[props.data.classId].on
      ? props.iconList[props.data.classId].on
      : null
  }
}

const ControlsList = props => {
  // switch 事件
  const onChange = checked => {
    props.updateSwitchState(checked, props.data, 1)
  }

  return (
    <>
      <div className="icon-box">{renderIcon(props)}</div>
      <div className="controls-name">
        <span>{props.data.name}</span>
        <span>设备id：{props.data.id}</span>
      </div>
      <div className="controls-on">{renderFirstVal(props)}</div>
      <div className="controls-off">{renderLasttVal(props, onChange)}</div>
    </>
  )
}

export default ControlsList
