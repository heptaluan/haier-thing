import React, { useState, useRef } from 'react'
import './index.scss'
import { Button, message, Tabs, Upload } from 'antd'
import { getUserToken, getUploadUrl, getDownloadUrl } from '../../../api/api'
import axios from 'axios'
import { useHistory } from 'react-router-dom'

import StepOne from './step-one'
import StepTwo from './step-two'
import StepThree from './step-three'
import StepFour from './step-four'

const { TabPane } = Tabs

const Setting = () => {
  axios.defaults.headers.common['Authorization'] = getUserToken()
  const history = useHistory()
  const stepRef = useRef(null)
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

  const props = {
    showUploadList: false,
    beforeUpload: file => {
      const formData = new FormData()
      formData.append('file', file)
      axios.defaults.headers.common[
        'X-Access-Token'
      ] = `eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2Mzc2NzkxODYsInVzZXJuYW1lIjoidGFpbGFpIn0.IcVyBJzx-ZtqcEyXEZPOTFJP118DxssVn2URJDuAz3M`
      axios
        .post(`http://192.168.1.204:9999/mission/productInfo/logoUpload`, formData)
        .then(res => {
          if (res.data.code === 200) {
            message.success(`上传成功`)
            setCurTabKey('1')
            stepRef.current.updateUserList()
          } else {
            message.error(res.data.message)
          }
        })
        .catch(err => {
          message.error(`请求失败，请检查网络是否通畅后再行尝试！`)
        })
      return false
    },
    onChange: info => {
      console.log(info.fileList)
    },
  }

  const download = () => {
    // window.open(getDownloadUrl())
  }

  return (
    <div className="setting-box-wrap">
      <div className="login-bar">
        <div>
          <Upload {...props}>
            <Button>上传数据</Button>
          </Upload>
        </div>
        <div>
          <Button
            onClick={() => {
              download()
            }}
          >
            下载模版
          </Button>
        </div>
        <div>
          <Button
            onClick={() => {
              logOut()
            }}
          >
            登出
          </Button>{' '}
        </div>
      </div>
      <div className="setting-box">
        <div className="card-container">
          <Tabs defaultActiveKey="1" activeKey={curTabKey} onChange={changeTabs}>
            <TabPane tab="用户管理" key="1">
              <StepOne cRef={stepRef} />
            </TabPane>
            <TabPane tab="学校管理" key="2">
              <StepTwo />
            </TabPane>
            <TabPane tab="摄像头管理" key="3">
              <StepThree />
            </TabPane>
            <TabPane tab="网关管理" key="4">
              <StepFour />
            </TabPane>
          </Tabs>
        </div>
      </div>
    </div>
  )
}

export default Setting
