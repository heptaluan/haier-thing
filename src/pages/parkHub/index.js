import React from 'react'
import './index.scss'
import HomeMenu from '../../components/common/homeMenu/index'
import TopHeader from '../../components/common/topHeader/index'
import ParkContent from '../../components/park/parkContent/index'

const ParkHub = () => {
  return (
    <>
      <TopHeader />
      <div className="park-hub-box">
        <HomeMenu />
        <div className="park-hub">
          <ParkContent />
        </div>
      </div>
    </>
  )
}

export default ParkHub
