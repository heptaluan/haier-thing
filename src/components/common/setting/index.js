import React, { useState } from 'react'
import './index.scss'
import { Button, message, Tabs } from 'antd'
import { getUserToken } from '../../../api/api'
import axios from 'axios'
import { useHistory } from 'react-router-dom'

import StepOne from './step-one'
import StepTwo from './step-two'
import StepThree from './step-three'

const { TabPane } = Tabs

const Setting = () => {
  axios.defaults.headers.common['Authorization'] = getUserToken()
  const history = useHistory()
  const [curTabKey, setCurTabKey] = useState('1')
  const changeTabs = activeKey => {
    setCurTabKey(activeKey)
  }

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
          <Tabs defaultActiveKey="1" onChange={changeTabs}>
            <TabPane tab="用户管理" key="1">
              {curTabKey === '1' ? <StepOne /> : <div></div>}
            </TabPane>
            <TabPane tab="学校管理" key="2">
              {curTabKey === '2' ? <StepTwo /> : <div></div>}
            </TabPane>
            <TabPane tab="摄像头管理" key="3">
              {curTabKey === '3' ? <StepThree /> : <div></div>}
            </TabPane>
          </Tabs>
        </div>
      </div>
    </div>
  )
}

export default Setting
