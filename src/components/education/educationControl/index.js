import React from 'react'
import './index.scss'
import IconFont from '../../common/IconFont/index'

const EducationControl = () => {
  return (
    <div className="education-control">
      <div className="bottom-box">
        <div className="view-music-box">
          <h4>音乐</h4>
          <div className="music-control">
            <IconFont style={{ fontSize: '36px' }} type="icon-zanting" />
            <IconFont
              style={{ fontSize: '36px' }}
              type="icon-bofang-shangyige-xiayige"
            />
            <IconFont
              style={{ fontSize: '36px' }}
              type="icon-bofang-xiayige-shangyige"
            />
            <IconFont
              style={{ fontSize: '36px' }}
              type="icon-bofang-tingzhi-zanting"
            />
          </div>
        </div>
        <div className="temperature-box">
          <div className="temperature-view">
            <div>
              <IconFont style={{ fontSize: '36px' }} type="icon-thermometer" />
              <span>23 度</span>
            </div>
            <div>
              <IconFont style={{ fontSize: '36px' }} type="icon-wenshidu-" />
              <span>66 度</span>
            </div>
          </div>
          <div className="illumination-view">
            <IconFont style={{ fontSize: '36px' }} type="icon-icon-test" />
            <span>600</span>
            <span>Lux</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EducationControl
