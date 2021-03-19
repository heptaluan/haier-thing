import React, { useState } from 'react'
import './index.scss'
import { Switch } from 'antd'

import on from '../../../assets/images/on.png'
import off from '../../../assets/images/off.png'

const WarningComponent = (props) => {

  const [warn, setWarn] = useState(false)

  const onChange = checked => {
    console.log(`${checked}`)
  }

  const handleChangeWarnState = () => {
    setWarn(!warn)
  }

  return (
    <div className="warning-component">
      <div className="box">
        <h4 className="title">燃气检测</h4>
        <div className="img-box">
          <img src={on} alt="cover" />
        </div>
        <p>123</p>
        <Switch defaultChecked={false} onChange={onChange} />
      </div>
      <div className="box">
        <h4 className="title">紧急报警</h4>
        <div className="img-box" onClick={() => handleChangeWarnState()}>
          {
            warn ? <img src={on} alt="cover" />
              : <img src={off} alt="cover" />
          }
        </div>
        <p>{ warn ? '警告' : '正常'}</p>
      </div>
    </div>
  )
}

export default WarningComponent
