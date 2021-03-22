import React from 'react'
import './index.scss'
import ConnectSetting from '../connectSetting/index'
import MonitorSetting from '../monitorSetting/index'

const HomeTopHeader = () => {
  return (
    <div className="home-top-header">
      <div className="logo">
        海尔智能家居
      </div>
      <div className="btn-groups">
        <MonitorSetting></MonitorSetting>
        <ConnectSetting></ConnectSetting>
      </div>
    </div>
  )
}

export default HomeTopHeader
