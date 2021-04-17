import React, { useEffect, useState } from 'react'
import './index.scss'
import { Form, Input, Button, Modal, message } from 'antd'
import { getUserListUrl, getAddUserUrl, getUserToken, getDelUserUrl } from '../../../api/api'
import axios from 'axios'
import { useHistory } from 'react-router-dom'

const CollectionCreateForm = ({ visible, onCreate, onCancel}) => {
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
          .catch(info => {
            console.log('Validate Failed:', info)
          })
      }}
    >
      <Form form={form} name="basic" initialValues={{ remember: true }}>
        <Form.Item
          label="用户名"
          name="username"
          rules={[{ required: true, message: '请输入用户名' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="密码"
          name="password"
          rules={[{ required: true, message: '请输入密码' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="再次输入密码"
          name="rePassword"
          rules={[{ required: true, message: '请再次输入密码' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="网关"
          name="gateway"
          rules={[{ required: true, message: '请输入网关' }]}
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
          message.success(`新增成功`)
          setVisible(false)
          setTimeout(() => {
            fetchData()
          }, 500)
        } else {
          message.success(`新增失败`)
          setVisible(false)
        }
      })
  }

  const open = () => {
    setVisible(true)
  }

  const deleteUser = id => {
    const userData = data.find(item => item.userNo === id)
    console.log(userData)
    axios
      .delete(getDelUserUrl(userData.userNo))
      .then(res => {
        if (res.data.code === '10000') {
          message.success(`删除成功`)
          setVisible(false)
          setTimeout(() => {
            fetchData()
          }, 500)
        }
      })
  }

  const logOut = () => {
    localStorage.setItem('user', '')
    history.push('/login')
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
              <span className="password">******</span>
              <span className="gateway">{item.gateway}</span>
              <span className="edit-box">
                <Button onClick={() => { deleteUser(item.userNo) }} type="primary">删除</Button>
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
    </div>
  )
}

export default Setting
