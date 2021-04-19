import React from 'react'
import './index.scss'
import { Button } from 'antd'

const renderIcon = props => {
  if (props.data.deviceState === 0) {
    return props.iconList[props.data.classId]?.off
      ? props.iconList[props.data.classId].off
      : null
  } else if (props.data.deviceState === 1) {
    return props.iconList[props.data.classId]?.on
      ? props.iconList[props.data.classId].on
      : null
  }
}

const HotelList = props => {
  return (
    <>
      <div className="icon-box">{renderIcon(props)}</div>
      <div className="controls-name">
        <span>{props.data.name}</span>
        <span>设备id：{props.data.id}</span>
      </div>
      <div className="controls-on">
        <Button
          onClick={() =>
            props.updateCurState(
              props.data.id,
              props.data.operations.find(item => item.operation_type === 0) &&
                props.data.operations.find(item => item.operation_type === 0)
                  .id,
              false
            )
          }
        >
          {props.data.operations?.find(item => item.operation_type === 0) &&
            props.data.operations?.find(item => item.operation_type === 0)
              .operation_name}
        </Button>
      </div>
      <div className="controls-switch">
        <Button
          onClick={() =>
            props.updateCurState(
              props.data.id,
              props.data.operations.find(item => item.operation_type === 1) &&
                props.data.operations.find(item => item.operation_type === 1)
                  .id,
              true
            )
          }
        >
          {props.data.operations?.find(item => item.operation_type === 1) &&
            props.data.operations?.find(item => item.operation_type === 1)
              .operation_name}
        </Button>
      </div>
    </>
  )
}

export default HotelList
