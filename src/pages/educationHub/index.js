import React from 'react'
import './index.scss'
import TopHeader from '../../components/common/topHeader/index'
import HomeMenu from '../../components/common/homeMenu/index'
import EducationContent from '../../components/education/educationContent/index'

const EducationHub = () => {
  return (
    <>
      <TopHeader />
      <div className="education-hub-box">
        <HomeMenu />
        <div className="education-hub">
          <EducationContent />
        </div>
      </div>
    </>
  )
}

export default EducationHub
