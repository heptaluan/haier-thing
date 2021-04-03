import React from 'react'
import './index.scss'

import IconFont from '../../common/IconFont/index'
import { Button } from 'antd'

const ParkPanel = () => {
  return (
    <div className="park-panel-wrap">
      <div className="park-panel-box">
        <div className="park-panel">
          <ul>
            <li>
              <span className="title">标签编号：</span>
              <span className="information-content">--- --- ---</span>
            </li>
            <li>
              <span className="title">车牌信息：</span>
              <span className="information-content">鄂A-88888</span>
            </li>
            <li>
              <span className="title">入场时间：</span>
              <span className="information-content">--- --- ---</span>
            </li>
            <li>
              <span className="title">出场时间：</span>
              <span className="information-content">--- --- ---</span>
            </li>
            <li>
              <span className="title">扣费信息：</span>
              <span className="information-content">--- --- ---</span>
            </li>
          </ul>
        </div>
        <div className="information-input">
          <h4>信息提示</h4>
          <div className="btn-group">
            <Button>录入</Button>
            <Button>删除</Button>
          </div>
        </div>
      </div>
      <div className="information-cover">
        <IconFont style={{ fontSize: '80px' }} type="icon-zidonglanganji" />
      </div>
    </div>
  )
}

export default ParkPanel