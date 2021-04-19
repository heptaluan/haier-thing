import React, { useEffect, useState } from 'react'
import './index.scss'
import { Form, Input, Button, Modal, message, Select } from 'antd'
import {
  getUserListUrl,
  getAddUserUrl,
  getUserToken,
  getDelUserUrl,
  getCameraListUrl,
  getUpdateCameraInfo,
} from '../../../api/api'
import axios from 'axios'
import { useHistory } from 'react-router-dom'
import { getGatewayUrl } from '../../../api/api'

const { Option } = Select

const CollectionCreateForm = ({ visible, onCreate, onCancel }) => {
  const [gateway, setGateway] = useState([])

  useEffect(() => {
    getGateway()
  }, [])

  const getGateway = async () => {
    const result = await axios.get(getGatewayUrl())
    if (result.data.code === '10000') {
      setGateway(result.data.result)
    }
  }

  const [form] = Form.useForm()
  return (
    <Modal
      visible={visible}
      title="新增用户"
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
          name="username"
          rules={[{ required: true, message: '请输入用户名' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="用户密码"
          name="password"
          rules={[{ required: true, message: '请输入密码' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="确认密码"
          name="rePassword"
          dependencies={['password']}
          rules={[
            { required: true, message: '请再次输入密码' },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve()
                }
                return Promise.reject(new Error('两次密码输入不一致'))
              },
            }),
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="网关名称"
          name="gateway"
          rules={[{ required: true, message: '请输入网关' }]}
        >
          <Select>
            {gateway?.map((item, index) => (
              <Option value={item} key={`option-${index}`}>
                {item}
              </Option>
            ))}
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  )
}

const CameraSetting = ({ visible, onCreate, onCancel }) => {
  const [cameraList, setCameraList] = useState([])

  useEffect(() => {
    getCameraList()
  }, [])

  const getCameraList= async () => {
    const result = await axios.get(getCameraListUrl())
    if (result.data.code === '10000') {
      setCameraList(result.data.result[0])
    }
  }

  const [form] = Form.useForm()

  form.setFieldsValue({
    ...cameraList
  })

  return (
    <Modal
      visible={visible}
      title="摄像头配置"
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

const Setting = () => {
  axios.defaults.headers.common['Authorization'] = getUserToken()
  const [data, setData] = useState([])
  const history = useHistory()

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    const result = await axios.get(getUserListUrl())
    if (result.data.code === '10000') {
      setData(result.data.result.records)
    }
  }

  // 新增用户
  const [visible, setVisible] = useState(false)
  const onCreate = values => {
    axios
      .post(getAddUserUrl(), {
        ...values,
      })
      .then(res => {
        if (res.data.code === '10000') {
          setVisible(false)
          fetchData()
          message.success(`新增成功`)
        } else {
          message.error(`新增失败`)
          setVisible(false)
        }
      })
  }

  const [cameraVisible, setCameraVisible] = useState(false)
  const onCameraCreate = values => {
    axios
      .post(getUpdateCameraInfo(), {
        ...values,
      })
      .then(res => {
        console.log(res)
        // if (res.data.code === '10000') {
        //   setVisible(false)
        //   fetchData()
        //   message.success(`新增成功`)
        // } else {
        //   message.error(`新增失败`)
        //   setVisible(false)
        // }
      })
  }

  const open = () => {
    setVisible(true)
  }

  const deleteUser = id => {
    const userData = data.find(item => item.userNo === id)
    axios.delete(getDelUserUrl(userData.userNo)).then(res => {
      if (res.data.code === '10000') {
        setVisible(false)
        fetchData()
        message.success(`删除成功`)
      }
    })
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

  const handleCameraSetting = () => {
    setCameraVisible(true)
  }

  return (
    <div className="setting-box-wrap">
      <div className="login-bar">
        <Button
          type="primary"
          style={{ margin: '0 20px 0 0' }}
          onClick={() => {
            handleCameraSetting()
          }}
        >
          摄像头配置
        </Button>
        <Button
          onClick={() => {
            logOut()
          }}
        >
          登出
        </Button>
      </div>
      <div className="setting-box">
        <div className="btn-groups">
          <Button
            type="primary"
            onClick={() => {
              open()
            }}
          >
            新增
          </Button>
        </div>
        <div className="table-header">
          <span className="name">用户名</span>
          <span className="password">密码</span>
          <span className="gateway">网关</span>
          <span className="edit-box">操作</span>
        </div>
        <ul className="user-list">
          {data.map(item => (
            <li key={item.userNo}>
              <span className="name">{item.username}</span>
              <span className="password">****</span>
              <span className="gateway">{item.gateway}</span>
              <span className="edit-box">
                <Button
                  onClick={() => {
                    deleteUser(item.userNo)
                  }}
                  type="primary"
                >
                  删除
                </Button>
              </span>
            </li>
          ))}
        </ul>
      </div>
      <CollectionCreateForm
        visible={visible}
        onCreate={onCreate}
        onCancel={() => {
          setVisible(false)
        }}
      />
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

export default Setting
