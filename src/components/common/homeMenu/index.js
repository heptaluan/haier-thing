import { Link, useHistory } from 'react-router-dom'
import React from 'react'
import { Menu } from 'antd'
import IconFont from '../IconFont/index'
import './index.scss'
import { getUserToken } from '../../../api/api'
import axios from 'axios'

const HomeMenu = props => {
  axios.defaults.headers.common['Authorization'] = getUserToken()
  const history = useHistory()

  return (
    <div className="home-menu">
      <Menu
        style={{ width: 250 }}
        mode="inline"
        theme="light"
        defaultSelectedKeys={['/family']}
        selectedKeys={[history.location.pathname]}
      >
        <Menu.Item
          key="/"
          icon={<IconFont style={{ fontSize: '24px' }} type="icon-jiaju" />}
        >
          <Link to="/">首页</Link>
        </Menu.Item>
        <Menu.Item
          key="/family"
          icon={<IconFont style={{ fontSize: '24px' }} type="icon-jiaju" />}
        >
          <Link to="/family">智慧家庭</Link>
        </Menu.Item>
        <Menu.Item
          key="/park"
          icon={<IconFont style={{ fontSize: '24px' }} type="icon-yuanqu" />}
        >
          <Link to="/park">智慧园区</Link>
        </Menu.Item>
        <Menu.Item
          key="/hotel"
          icon={<IconFont style={{ fontSize: '24px' }} type="icon-jiaju" />}
        >
          <Link to="/hotel">智慧酒店</Link>
        </Menu.Item>
        <Menu.Item
          key="/education"
          icon={<IconFont style={{ fontSize: '24px' }} type="icon-jiaju" />}
        >
          <Link to="/education">智慧教育</Link>
        </Menu.Item>
      </Menu>
    </div>
  )
}

export default HomeMenu
