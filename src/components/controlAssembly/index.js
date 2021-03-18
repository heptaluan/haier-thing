import React, { useState } from 'react'
import './index.scss'

const ControlAssembly = (props) => {
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
          curData.state ? <img src={curData.onImg} alt="cover"/>
            : <img src={curData.offImg} alt="cover"/>
        }
      </div>
      <button onClick={() => handleButtonClick(true)}>开启灯光</button>
      <button onClick={() => handleButtonClick(false)}>关闭灯光</button>
    </div>
  )
}

export default ControlAssembly
