import React from 'react'
import './index.scss'
import IconFont from '../../common/IconFont/index'
import { Switch, Button } from 'antd'
import CameraComponent from '../../common/cameraComponent/index'

const AccessList = props => {
  const handleSwitchChange = (checked, e) => {
    props.updateAccessState(parseInt(e.target.id), checked)
  }

  return (
    <div className="access-box view-box-wrap">
      <ul>
        <li>
          <div className="icon-box">
            <IconFont style={{ fontSize: '40px' }} type="icon-zhuangtai" />
          </div>
          <div className="controls-name">
            <span>等待认证</span>
          </div>
          <div className="controls-edit">
            <div className="edit-box">
              <Button
                icon={
                  <IconFont
                    style={{ fontSize: '18px' }}
                    type="icon-jurassic_edit-user"
                  />
                }
              >
                录入身份
              </Button>
            </div>
            <div className="edit-box">
              <Button
                icon={
                  <IconFont
                    style={{ fontSize: '18px' }}
                    type="icon-jurassic_delete-user"
                  />
                }
              >
                删除身份
              </Button>
            </div>
            <div className="edit-box">
              <Button
                icon={
                  <IconFont
                    style={{ fontSize: '18px' }}
                    type="icon-zhinengmensuo"
                  />
                }
              >
                打开门锁
              </Button>
            </div>
          </div>
          <div className="controls-switch" style={{ visibility: 'hidden' }}>
            <Switch />
          </div>
        </li>

        {props.list.map(item => (
          <li key={item.id}>
            <div className="icon-box">
              {(item.onIcon && item.id !== 4) || item.state
                ? item.onIcon
                : item.offIcon}
            </div>
            <div className="controls-name">
              <span>{item.title}</span>
              <span>设备id：{item.id}</span>
            </div>
            <div className="controls-on">
              <span>{item.stateText}</span>
            </div>
            <div className="controls-switch">
              <Switch id={item.id} defaultChecked={item.state} onChange={handleSwitchChange} />
            </div>
          </li>
        ))}
      </ul>
      <div className="view-box">
        <div className="view-box-first">54654646464</div>
        <div className="view-box-last">
          <CameraComponent />
        </div>
      </div>
    </div>
  )
}

export default AccessList
