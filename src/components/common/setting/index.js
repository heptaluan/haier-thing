import React, { useState } from 'react'
import './index.scss'
import { Button, Modal, message, Tabs } from 'antd'
import {
  getUserToken,
} from '../../../api/api'
import axios from 'axios'
import { useHistory } from 'react-router-dom'

import StepOne from './step-one'
import StepTwo from './step-two'
import StepThree from './step-three'

const { TabPane } = Tabs

const Setting = () => {
  axios.defaults.headers.common['Authorization'] = getUserToken()
  const history = useHistory()

  const logOut = () => {
    localStorage.setItem(
      'userInfo',
      JSON.stringify({
        user: '',
        role: '',
        name: '',
      })
    )
    history.push('/login')
    message.success(`登出成功`)
  }

  return (
    <div className="setting-box-wrap">
      <div className="login-bar">
        <Button
          onClick={() => {
            logOut()
          }}
        >
          登出
        </Button>
      </div>
      <div className="setting-box">
        <div className="card-container">
          <Tabs defaultActiveKey="1">
            <TabPane tab="用户管理" key="1">
              <StepOne />
             </TabPane>
            <TabPane tab="学校管理" key="2">
              <StepTwo />
            </TabPane>
            <TabPane tab="摄像头管理" key="3">
              <StepThree />
            </TabPane>
          </Tabs>
        </div>
      </div>
      
    </div>
  )
}

export default Setting
