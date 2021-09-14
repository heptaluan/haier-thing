import React, { useState } from 'react'
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
      formData.append('multipartFile', file)
      axios.post(getUploadUrl(), formData).then(res => {
        if (res.data.code === '10000') {
          message.success(`上传成功`)
        } else if (res.data.code === '20000') {
          message.error(`上传失败，${res.data.message}`)
        }
      })
      return false
    },
    onChange: info => {
      console.log(info.fileList)
    },
  }

  const download = () => {
    window.open(getDownloadUrl())
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
            <TabPane tab="网关管理" key="4">
              {curTabKey === '4' ? <StepFour /> : <div></div>}
            </TabPane>
          </Tabs>
        </div>
      </div>
    </div>
  )
}

export default Setting
