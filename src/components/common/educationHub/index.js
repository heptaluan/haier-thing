import React from 'react'

import EducationHeader from '../../components/education/educationHeader/index'
import EducationControl from '../../components/education/educationControl/index'
import CameraComponent from '../../components/common/cameraComponent/index'

const EducationHub = () => {
  return (
    <div className="education-hub">
      <EducationHeader />
      <CameraComponent />
      <EducationControl />
    </div>
  )
}

export default EducationHub
