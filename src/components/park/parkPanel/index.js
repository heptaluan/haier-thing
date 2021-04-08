import React from 'react'
import './index.scss'

import IconFont from '../../common/IconFont/index'
import { Button } from 'antd'

const ParkPanel = () => {
  return (
    <div className="park-panel-wrap">
      <div className="park-panel-box">
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
