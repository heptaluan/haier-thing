import React from 'react'
import './index.scss'

import IconFont from '../../common/IconFont/index'
import { Button } from 'antd'

const InformationManagement = () => {
  return (
    <div className="intelligent-home-wrap">
      <div className="intelligent-home">
        <div className="chart-component-box">
          <ChartComponent data={tempStatus} />
        </div>
        <div className="warning-component-box">
          <WarningComponent />
        </div>
        <div className="voice-component-box">
          <h4>语音控制</h4>
          <p>----</p>
          <IconFont
            style={{ fontSize: '100px' }}
            type="icon-lvsefenkaicankaoxianban-"
          />
        </div>
        <div className="control-component-box">
          {states.map(item => (
            <ControlComponent
              key={item.id}
              id={item.id}
              data={item}
              updateState={updateCurState}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default InformationManagement
