import React from 'react'
import './index.scss'
import on from '../../../assets/images/on.png'

const AccessControl = () => {
  return (
    <div className="access-control">
      <div className="view-box">
        2342343242332
      </div>
      <div className="view-control">
        <div className="verify-box">
          <img src={on} alt="view-control"/>
          <span>等待认证</span>
        </div>
        <div>
          <img src={on} alt="view-control"/>
          <span>录入身份</span>
        </div>
        <div>
          <img src={on} alt="view-control"/>
          <span>删除身份</span>
        </div>
        <div>
          <img src={on} alt="view-control"/>
          <span>打开门锁</span>
        </div>
      </div>
    </div>
  )
}

export default AccessControl
