import React from 'react'
import './index.scss'
import IconFont from '../../common/IconFont/index'
import EducationControl from '../educationControl/index'
import CameraComponent from '../../common/cameraComponent/index'
import 'moment/locale/zh-cn'

const EducationContent = () => {
  const tempStatus = {
    temperature: '---',
    humidity: '---',
    illumination: '---',
    chartData: {
      xAxis: [],
      temperature: [],
      humidity: [],
      illumination: [],
    },
  }

  return (
    <div className="education-box">
      <div className="view-box-wrap">
        <ul>
          <li>
            <div className="icon-box">
              <IconFont
                style={{ fontSize: '60px' }}
                type="icon-icon-test"
              />
            </div>
            <div className="controls-name">
              <span>光照强度</span>
              <span>设备id：123</span>
            </div>
            <div className="controls-on">
              <span>30度</span>
            </div>
          </li>
        </ul>
        <div className="view-box">
          <div className="view-box-first">
            <EducationControl />
          </div>
          <div className="view-box-last">
            <CameraComponent />
          </div>
        </div>
      </div>
    </div>
  )
}

export default EducationContent
