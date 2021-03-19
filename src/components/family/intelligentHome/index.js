import React, { useState } from 'react'
import ControlComponent from '../controlComponent/index'
import ChartComponent from '../chartComponent/index'
import WarningComponent from '../warningComponent/index'

import on from '../../../assets/images/on.png'
import off from '../../../assets/images/off.png'

import './index.scss'

const IntelligentHome = () => {
  
  // 控制组件
  const controlStatus = [
    { id: 1, title: '智能灯光', state: false, onImg: on, offImg: off },
    { id: 2, title: '智能开关', state: true, onImg: on, offImg: off },
    { id: 3, title: '智能空调', state: false, onImg: on, offImg: off },
    { id: 4, title: '智能窗帘', state: true, onImg: on, offImg: off },
  ]
  const [states, setState] = useState(controlStatus)

  const updateCurState = (id, updateState) => {
    console.log(updateState)
    setState(states.map(el => (el.id === id ? updateState : el)))
  }

  // 温度计 && 光照
  const temperatureStatus = {
    temperature: 123,
    humidity: 456,
    illumination: 789,
    chartData: {
      xAxis: ['一', '二', '三', '四', '五', '六', '七', '八', '九'],
      temperature: [1, 3, 9, 27, 81, 247, 741, 2223, 6669],
      humidity: [1, 2, 4, 8, 16, 32, 64, 128, 256],
      illumination: [1, 24, 24, 28, 162, 322, 642, 2, 15]
    }
  }

  return (
    <div className="intelligent-home">
      <div className="control-component-box">
        {
          states.map(item => (
            <ControlComponent
              key={item.id}
              id={item.id}
              data={item}
              updateState={updateCurState}
            />
          ))
        }
      </div>
      <div className="chart-component-box">
        <ChartComponent data={temperatureStatus} />
      </div>
      <div className="warning-component-box">
        <WarningComponent />
      </div>
      <div className="voice-component-box">
        <h4>语音控制</h4>
        <img src={on} alt="voice-control"/>
      </div>
    </div>
  )
}

export default IntelligentHome
