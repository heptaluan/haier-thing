import React from 'react'
import './index.scss'

const EducationList = (props) => {
  return (
    <>
      <div className="icon-box">{props.iconList}</div>
      <div className="controls-name">
        <span>{props.data.name}</span>
        <span>设备id：{props.data.id}</span>
      </div>
      <div className="controls-on">
        <span>{props.data.latestData ? JSON.parse(props.data.latestData.value).value : '--'}</span>
      </div>
    </>
  )
}

export default EducationList
