import React from 'react'
import './index.scss'
import { Switch, Button, Badge } from 'antd'

const renderLasttVal = (props, onChange) => {
  switch (props.data.classId) {
    case 2:
    case 3:
    case 4:
    case 5:
      return <Switch checked={props.data.deviceState === 0 ? false : true} defaultChecked={false} onChange={onChange} />
    case 10:
      return (
        <div>
          <Button onClick={() => onChange(true)}>开启</Button>
          &nbsp;&nbsp;&nbsp;&nbsp;
          <Button onClick={() => onChange(false)}>关闭</Button>
        </div>
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

const ParkList = props => {
  const handleSwitchChange = checked => {
    props.updateCurState(checked, props.data)
  }

  return (
    <>
      <div className="icon-box">{renderIcon(props)}</div>
      <div className="controls-name">
        <span>{props.data.name}</span>
        <span>设备id：{props.data.id}</span>
      </div>
      <div className="controls-state">
        <span>
          {props.data.latestData &&
          JSON.parse(props.data.latestData.value).value === 1 ? (
            <Badge count={'异常'} style={{ backgroundColor: '#ff4d4f' }} />
          ) : (
            <Badge count={'正常'} style={{ backgroundColor: '#52c41a' }} />
          )}
        </span>
      </div>
      <div className="controls-switch">
        {renderLasttVal(props, handleSwitchChange)}
      </div>
    </>
  )
}

export default ParkList
