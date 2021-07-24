import React from 'react'
import './index.scss'
import { Form, Input, Button, message } from 'antd'
import { getUserLoginUrl, getUserToken } from '../../../api/api'
import axios from 'axios'
import { useHistory } from 'react-router-dom'
import banner from '../../../assets/images/banner.png'

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
          message.success(`登录成功`)
          localStorage.setItem(
            'gateway',
            res.data.result.user.gateway
          )
          localStorage.setItem(
            'userInfo',
            JSON.stringify({
              user: res.data.result.user.token,
              role: res.data.result.role,
              name: value.identity
            })
          )
          if (res.data.result.role === 'sysadmin') {
            history.push('/setting')
          } else if (res.data.result.role === 'user') {
            history.push('/home')
          }
          setTimeout(() => {
            window.location.reload()
          }, 0);
        } else if (res.data.code === '20006') {
          message.error(`用户名或密码错误`)
        } else if (res.data.code === '20008') {
          message.error(`用户不存在`)
        } else if (res.data.code === '40000') {
          message.error(`软件未授权`)
        }
      })
  }

  return (
    <div className="login-box-wrap">
      <div className="login-box">
        <div className="banner">
          <img src={banner} alt=""/>
        </div>
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
