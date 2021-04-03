import React from 'react'
import './index.scss'
import { useHistory } from 'react-router-dom'
import MusicComponent from '../musicComponent/index'

const TopHeader = () => {
  const history = useHistory()
  let pathname = null
  switch (history.location.pathname) {
    case '/family':
      pathname = '智慧家庭'
      break
    default:
      break
  }
  return (
    <div className="top-header-box">
      <div className="top-header">
        <div className="logo">{pathname}</div>
        
      </div>
    </div>
  )
}

export default TopHeader
