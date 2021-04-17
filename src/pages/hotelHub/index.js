import React from 'react'
import './index.scss'
import HomeMenu from '../../components/common/homeMenu/index'
import TopHeader from '../../components/common/topHeader/index'
import HotelContent from '../../components/hotel/hotelContent/index'

const HotelHub = () => {
  return (
    <>
      <TopHeader />
      <div className="hotel-hub-box">
        <HomeMenu />
        <div className="hotel-hub">
          <HotelContent />
        </div>
      </div>
    </>
  )
}

export default HotelHub
