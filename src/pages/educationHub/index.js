import React from 'react'
import './index.scss'
import EducationHeader from '../../components/education/educationHeader/index'
import EducationControl from '../../components/education/educationControl/index'
import CameraComponent from '../../components/common/cameraComponent/index'

const EducationHub = () => {
  return (
    <div className="education-hub-box">
      <EducationHeader />
      <div className="education-hub">
        <CameraComponent />
        <EducationControl />
      </div>
    </div>
  )
}

export default EducationHub
