import React from 'react'
import './index.scss'
import { Button, Switch, Badge } from 'antd'

const renderFirstVal = props => {
  switch (props.data.classId) {
    case 16:
      return (
        <span
          className={
            props.data.active ? `active-${props.data.active}` : `active-false`
          }
        >
          {props.data.latestData && JSON.parse(props.data.latestData.value).value} %
        </span>
      )
    case 14:
      return (
        <span
          className={
            props.data.active ? `active-${props.data.active}` : `active-false`
          }
        >
          {props.data.latestData && JSON.parse(props.data.latestData.value).value} Lux
        </span>
      )
    case 15:
      return (
        <span
          className={
            props.data.active ? `active-${props.data.active}` : `active-false`
          }
        >
          {props.data.latestData && JSON.parse(props.data.latestData.value).value} ℃
        </span>
      )
    case 3:
    case 10:
      return (
        <span>
          {props.data.latestData &&
          JSON.parse(props.data.latestData.value).value === 1 ? (
            <Badge count={'异常'} style={{ backgroundColor: '#ff4d4f' }} />
          ) : (
            <Badge count={'正常'} style={{ backgroundColor: '#52c41a' }} />
          )}
        </span>
      )
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
      return <Switch checked={props.data.deviceState === 0 ? false : true} defaultChecked={false} onChange={onChange} />
    case 10:
      return (
        <div>
          <Button onClick={() => onChange(false)}>关闭</Button>
          &nbsp;&nbsp;&nbsp;&nbsp;
          <Button onClick={() => onChange(true)}>开启</Button>
        </div>
      )
    case 8:
    case 11:
    case 19:
      return (
        <Button
          onClick={() =>
            props.updateCurState(
              props.data.id,
              props.data.operations.find(item => item.operation_type === 1).id,
              true
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
