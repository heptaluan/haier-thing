import React, { useEffect, useState } from 'react'
import './index.scss'
import { Form, Input, Button, Modal, message } from 'antd'
import {
  getUserListUrl,
  getUserToken,
  getDelUserUrl,
  getCameraListUrl,
  getUpdateCameraInfo,
} from '../../../api/api'
import axios from 'axios'

const CameraSetting = ({ visible, onCreate, onCancel }) => {
  const [cameraList, setCameraList] = useState([])

  useEffect(() => {
    getCameraList()
  }, [])

  const getCameraList = async () => {
    const result = await axios.get(getCameraListUrl())
    if (result.data.code === '10000') {
      setCameraList(result.data.result[0])
    }
  }

  const [form] = Form.useForm()

  form.setFieldsValue({
    ...cameraList,
  })

  return (
    <Modal
      visible={visible}
      title="新增摄像头"
      onCancel={onCancel}
      okText="确定"
      cancelText="取消"
      onOk={() => {
        form
          .validateFields()
          .then(values => {
            form.resetFields()
            onCreate(values)
          })
          .catch(info => {})
      }}
    >
      <Form form={form} name="basic" initialValues={{ remember: true }}>
        <Form.Item
          label="用户姓名"
          name="userName"
          rules={[{ required: true, message: '请输入用户姓名' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="用户密码"
          name="userPassword"
          rules={[{ required: true, message: '请输入用户密码' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="连接地址"
          name="ipAddress"
          rules={[{ required: true, message: '请输入连接地址' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="端口地址"
          name="portAddress"
          rules={[{ required: true, message: '请输入端口地址' }]}
        >
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  )
}

const StepThree = () => {
  axios.defaults.headers.common['Authorization'] = getUserToken()
  const [data, setData] = useState([
    {
      userNo: 1,
      userName: 123,
      userPassword: 123,
      ipAddress: '123.123.123.123',
      portAddress: '123.123.123.123',
    },
  ])

  const [cameraVisible, setCameraVisible] = useState(false)
  const onCameraCreate = values => {
    axios
      .post(getUpdateCameraInfo(), {
        ...values,
      })
      .then(res => {
        console.log(res)
        if (res.data.code === '10000') {
          setCameraVisible(false)
          fetchData()
          message.success(`新增成功`)
        } else {
          message.error(`新增失败`)
          setCameraVisible(false)
        }
      })
  }

  // useEffect(() => {
  //   fetchData()
  // }, [])

  const fetchData = async () => {
    // 换成摄像头地址
    const result = await axios.get(getUserListUrl())
    if (result.data.code === '10000') {
      setData(result.data.result.records)
    }
  }

  const handleDelete = id => {
    const userData = data.find(item => item.userNo === id)
    axios.delete(getDelUserUrl(userData.userNo)).then(res => {
      if (res.data.code === '10000') {
        setCameraVisible(false)
        fetchData()
        message.success(`删除成功`)
      }
    })
  }

  const handleCameraSetting = () => {
    setCameraVisible(true)
  }

  return (
    <div className="tab-three">
      <div className="btn-groups">
        <Button
          type="primary"
          onClick={() => {
            handleCameraSetting()
          }}
        >
          新增摄像头
        </Button>
      </div>
      <div className="table-header">
        <span className="name">用户姓名</span>
        <span className="password">用户密码</span>
        <span className="ip-address">连接地址</span>
        <span className="port-address">端口地址</span>
        <span className="edit-box">操作</span>
      </div>
      <ul className="user-list">
        {data.map(item => (
          <li key={item.userNo}>
            <span className="name">{item.userName}</span>
            <span className="password">****</span>
            <span className="ip-address">{item.ipAddress}</span>
            <span className="port-address">{item.portAddress}</span>
            <span className="edit-box">
              <Button
                onClick={() => {
                  handleDelete(item.userNo)
                }}
                type="primary"
              >
                删除
              </Button>
            </span>
          </li>
        ))}
      </ul>
      <CameraSetting
        visible={cameraVisible}
        onCreate={onCameraCreate}
        onCancel={() => {
          setCameraVisible(false)
        }}
      />
    </div>
  )
}

export default StepThree
