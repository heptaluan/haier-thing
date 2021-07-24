import React from 'react'
import './index.scss'
import { Button, Avatar, message } from 'antd'
import { useHistory } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { getUserName } from '../../../api/api'

const TopHeader = () => {
  const history = useHistory()
  const name = getUserName()
  const logOut = () => {
    localStorage.setItem(
      'userInfo',
      JSON.stringify({
        user: '',
        role: '',
        name: ''
      })
    )
    history.push('/login')
    message.success(`退出登录成功`)
  }

  return (
    <div className="top-header-box">
      <div className="top-header">
        <div className="logo">
          <Link to="/">物联网场景设计与开发智能平台</Link>
        </div>
        <div className="logout">
          <div className="user-name">{name}</div>
          <Avatar size={35}>{name}</Avatar>
          <Button
            onClick={() => {
              logOut()
            }}
          >
            登出
          </Button>
        </div>
      </div>
    </div>
  )
}

export default TopHeader
