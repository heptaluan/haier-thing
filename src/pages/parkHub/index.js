import React from 'react'
import './index.scss'

import InformationManagement from '../../components/park/informationManagement/index'
import InformationControl from '../../components/park/informationControl/index'
import ParkHeader from '../../components/park/parkHeader/index'
import CameraComponent from '../../components/common/cameraComponent/index'

const parkHub = () => {
  return (
    <div className="park-hub-box">
      <ParkHeader />
      <div className="park-hub">
        <InformationManagement />
        <CameraComponent />
        <InformationControl />
      </div>
    </div>
  )
}

export default parkHub
