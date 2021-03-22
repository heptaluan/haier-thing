import React, { useState } from 'react'
import './index.scss'
import { Button } from 'antd'

const ControlComponent = (props) => {
  const [curData, setCurData] = useState(props.data)
  
  const handleButtonClick = (target) => {
    setCurData({...curData, state: target})
    props.updateState(props.id, curData)
  }

  return (
    <div className="control-component">
      <h4 className="title">{curData.title}</h4>
      <div className="img-box">
        {
          curData.state ? curData.on : curData.off
        }
      </div>
      <Button onClick={() => handleButtonClick(true)}>{curData.onText}</Button>
      <Button onClick={() => handleButtonClick(false)}>{curData.offText}</Button>
    </div>
  )
}

export default ControlComponent
