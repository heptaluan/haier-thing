import { Link } from 'react-router-dom'
import React from 'react'
import { Menu } from 'antd'
import IconFont from '../../common/IconFont/index'
import './index.scss'

const FamilyMenu = () => {
  return (
    <>
      <Menu
        style={{ width: 200, paddingTop: 50 }}
        defaultSelectedKeys={['1']}
        mode="inline"
        theme="light"
      >
        <Menu.Item
          key="1"
          icon={<IconFont style={{ fontSize: '24px' }} type="icon-jiaoyu" />}
        >
          <Link to="/family/home">智能家居</Link>
        </Menu.Item>
        <Menu.Item
          key="2"
          icon={<IconFont style={{ fontSize: '24px' }} type="icon-jiaoyu" />}
        >
          <Link to="/family/systems">智能安防</Link>
        </Menu.Item>
        <Menu.Item
          key="3"
          icon={<IconFont style={{ fontSize: '24px' }} type="icon-jiaoyu" />}
        >
          <Link to="/family/entertainment">智能安防</Link>
        </Menu.Item>
        <Menu.Item
          key="4"
        >
          <Link to="/">回首页测试</Link>
        </Menu.Item>
      </Menu>
    </>
  )
}

export default FamilyMenu
