import React from 'react'
import './index.scss'
import { Button } from 'antd'
import { useHistory } from 'react-router-dom'

const TopHeader = () => {
  const history = useHistory()

  const logOut = () => {
    localStorage.setItem('user', '')
    history.push('/login')
  }

  return (
    <div className="top-header-box">
      <div className="top-header">
        <div className="logo">物联网场景设计与开发智能平台</div>
        <div className="logout">
          <Button onClick={() => { logOut() }}>登出</Button>
        </div>
      </div>
    </div>
  )
}

export default TopHeader
