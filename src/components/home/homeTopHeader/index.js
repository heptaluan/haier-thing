import React from 'react'
import './index.scss'
import ConnectSetting from '../connectSetting/index'
import MonitorSetting from '../monitorSetting/index'

const HomeTopHeader = () => {
  return (
    <div className="home-top-header">
      <div>
        <MonitorSetting></MonitorSetting>
      </div>
      <div>
        <ConnectSetting></ConnectSetting>
      </div>
    </div>
  )
}

export default HomeTopHeader
