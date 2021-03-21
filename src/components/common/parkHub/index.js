import React from 'react'

import InformationManagement from '../../components/park/informationManagement/index'
import InformationControl from '../../components/park/informationControl/index'
import CameraComponent from '../../components/common/cameraComponent/index'


const parkHub = () => {
  return (
    <div className="park-hub">
      <InformationManagement />
      <CameraComponent />
      <InformationControl />
    </div>
  )
}

export default parkHub
