import React from 'react'
import './index.scss'
import IconFont from '../../common/IconFont/index'

const AccessControl = () => {
  return (
    <div className="access-control">
      <div className="view-box">2342343242332</div>
      <div className="view-control">
        <div className="verify-box">
          <IconFont style={{ fontSize: '16px' }} type="icon-zhuangtai" />
          <span>等待认证</span>
        </div>
        <div className="edit-box">
          <IconFont style={{ fontSize: '36px' }} type="icon-jurassic_edit-user" />
          <span>录入身份</span>
        </div>
        <div className="edit-box">
          <IconFont style={{ fontSize: '36px' }} type="icon-jurassic_delete-user" />
          <span>删除身份</span>
        </div>
        <div className="edit-box">
          <IconFont style={{ fontSize: '36px' }} type="icon-zhinengmensuo" />
          <span>打开门锁</span>
        </div>
      </div>
    </div>
  )
}

export default AccessControl
