import React from 'react'
import './index.scss'
import { Button } from 'antd'

const HotelPanel = () => {
  return (
    <div className="hotel-panel-wrap">
      <div className="hotel-panel-box">
        <div className="hotel-panel">
          <ul>
            <li>
              <span className="title">标签编号：</span>
              <span className="information-content">--- --- ---</span>
            </li>
            <li>
              <span className="title">身份证号：</span>
              <span className="information-content">--- --- ---</span>
            </li>
            <li>
              <span className="title">用户姓名：</span>
              <span className="information-content">--- --- ---</span>
            </li>
            <li>
              <span className="title">入住时间：</span>
              <span className="information-content">--- --- ---</span>
            </li>
            <li>
              <span className="title">入住天数：</span>
              <span className="information-content">--- --- ---</span>
            </li>
            <li>
              <span className="title">预付金额：</span>
              <span className="information-content">--- --- ---</span>
            </li>
            <li>
              <span className="title">房间号：</span>
              <span className="information-content">--- --- ---</span>
            </li>
          </ul>
        </div>
        <div className="information-input">
          <h4>信息提示</h4>
          <div className="btn-group">
            <Button>信息登记</Button>
            <Button>信息注销</Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HotelPanel
