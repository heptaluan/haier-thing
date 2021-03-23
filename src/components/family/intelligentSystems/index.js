import React from 'react'
import './index.scss'

import AccessControl from '../accessControl/index'
import CameraComponent from '../../common/cameraComponent/index'
import SecuritySystem from '../../common/securitySystem/index'

import IconFont from '../../common/IconFont/index'

const IntelligentSystems = () => {
  const controlList = [
    {
      id: '0',
      title: '人体感应',
      type: 'switch',
      cover: <IconFont style={{ fontSize: '45px' }} type="icon-rentiganying" />,
    },
    {
      id: '1',
      title: '红外警戒',
      type: 'switch',
      cover: (
        <IconFont style={{ fontSize: '45px' }} type="icon-hongwaijiance" />
      ),
    },
    {
      id: '2',
      title: '烟雾感应',
      type: 'switch',
      cover: <IconFont style={{ fontSize: '45px' }} type="icon-yanwujiance_1" />,
    },
    {
      id: '3',
      title: '紧急报警',
      type: 'warn',
      cover: (
        <IconFont style={{ fontSize: '45px' }} type="icon-jingbaobaojing" />
      ),
    },
  ]

  const handleSwitchChange = (checked, id) => {
    console.log(checked, id)
  }

  return (
    <div className="intelligent-systems-wrap">
      <div className="intelligent-systems">
        <AccessControl />
        <CameraComponent />
        <div className="security-system-box">
          <SecuritySystem
            list={controlList}
            handleSwitchChange={handleSwitchChange}
          />
        </div>
      </div>
    </div>
  )
}

export default IntelligentSystems
