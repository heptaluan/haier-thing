import React from 'react'
import './index.scss'
import { Form, Input, Button } from 'antd'
import { getUserLoginUrl, getUserToken } from '../../../api/api'
import axios from 'axios'
import { useHistory } from 'react-router-dom'

const Login = () => {
  axios.defaults.headers.common['Authorization'] = getUserToken()
  const history = useHistory()
  const handleLogin = value => {
    axios
      .post(getUserLoginUrl(), {
        ...value,
      })
      .then(res => {
        if (res.data.code === '10000') {
          localStorage.setItem(
            'userInfo',
            JSON.stringify({
              user: res.data.result.user.token,
              role: res.data.result.role,
            })
          )
          if (res.data.result.role === 'sysadmin') {
            history.push('/setting')
          } else if (res.data.result.role === 'user') {
            history.push('/home')
          }
        }
      })
  }

  return (
    <div className="login-box-wrap">
      <div className="login-box">
        <Form
          name="normal_login"
          className="login-form"
          initialValues={{ remember: true }}
          onFinish={handleLogin}
        >
          <Form.Item
            name="identity"
            rules={[{ required: true, message: '请输入用户名' }]}
          >
            <Input placeholder="请输入用户名" />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: '请输入密码' }]}
          >
            <Input type="password" placeholder="请输入密码" />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
            >
              登录
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}

export default Login
