import React from 'react'
import './index.scss'

const renderUnit = props => {
  if (props.data.classId === 16) {
    return <span> %</span>
  } else if (props.data.classId === 15) {
    return <span> ℃</span>
  } else if (props.data.classId === 14) {
    return <span> Lux</span>
  }
}

const EducationList = (props) => {
  return (
    <>
      <div className="icon-box">{props.iconList}</div>
      <div className="controls-name">
        <span>{props.data.name}</span>
        <span>设备id：{props.data.id}</span>
      </div>
      <div className="controls-on education-list">
        <span className={props.data.active ? `active-${props.data.active}` : `active-false`}>
          {props.data.latestData ? JSON.parse(props.data.latestData.value).value : '--'}
          {
            renderUnit(props)
          }
        </span>
      </div>
    </>
  )
}

export default EducationList
