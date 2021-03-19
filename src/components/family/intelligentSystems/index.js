import React from 'react'
import './index.scss'

import AccessControl from '../accessControl/index'
import CameraComponent from '../../common/cameraComponent/index'
import SecuritySystem from '../../common/securitySystem/index'

import on from '../../../assets/images/on.png'

const IntelligentSystems = () => {

  const controlList = [
    { id: '0', title: '人体感应', type: 'switch', cover: on },
    { id: '1', title: '红外警戒', type: 'switch', cover: on },
    { id: '2', title: '烟雾感应', type: 'switch', cover: on },
    { id: '3', title: '紧急报警', type: 'warn', cover: on },
  ]

  const handleSwitchChange = (checked, id) => {
    console.log(checked, id)
  }

  return (
    <div className="intelligent-systems">
      <AccessControl />
      <CameraComponent />
      <SecuritySystem
        list={controlList}
        handleSwitchChange={handleSwitchChange}
      />
    </div>
  )
}

export default IntelligentSystems
