import React from 'react'
import './index.scss'
import { Form, Input, Button } from 'antd'
import { getUserToken } from '../../../api/api'
import axios from 'axios'

const Login = () => {
  axios.defaults.headers.common['Authorization'] = getUserToken()
  return (
    <div className="login-box-wrap">
      <div className="login-box">
        <Form
          name="normal_login"
          className="login-form"
          initialValues={{ remember: true }}
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
