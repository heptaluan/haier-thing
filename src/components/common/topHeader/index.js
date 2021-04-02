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
    case '/park':
      pathname = '智慧园区'
      break
    case '/hotel':
      pathname = '智慧酒店'
      break
    case '/education':
      pathname = '智慧教育'
      break
    default:
      break
  }
  return (
    <div className="top-header-box">
      <div className="top-header">
        <div className="logo">{pathname}</div>
        <MusicComponent />
      </div>
    </div>
  )
}

export default TopHeader
