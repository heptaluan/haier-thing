import React from 'react'
import './index.scss'

import on from '../../../assets/images/on.png'

const InformationManagement = () => {
  return (
    <div className="information-management">
      <div className="information-box">
        <div className="information-view">
          <span>标签编号：--- --- ---</span>
          <span>车牌信息：--- --- ---</span>
          <span>入场时间：--- --- ---</span>
          <span>出场时间：--- --- ---</span>
          <span>扣费信息：--- --- ---</span>
        </div>
        <div className="information-input">
          <h4>信息提示</h4>
          <button>录入</button>
          <button>删除</button>
        </div>
      </div>
      <div className="information-cover">
        <img src={on} alt="information-cover" />
      </div>
    </div>
  )
}

export default InformationManagement
