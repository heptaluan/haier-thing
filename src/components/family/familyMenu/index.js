import { Link } from 'react-router-dom'
import React from 'react'
import { Menu } from 'antd'
import IconFont from '../../common/IconFont/index'
import './index.scss'

const FamilyMenu = () => {
  return (
    <div className="family-menu">
      <Menu
        style={{ width: 200, paddingTop: 50 }}
        defaultSelectedKeys={['2']}
        mode="inline"
        theme="light"
      >
        <Menu.Item
          key="1"
          icon={<IconFont style={{ fontSize: '24px' }} type="icon-jiaju" />}
        >
          <Link to="/">首页</Link>
        </Menu.Item>
        <Menu.Item
          key="2"
          icon={<IconFont style={{ fontSize: '24px' }} type="icon-jiaju" />}
        >
          <Link to="/family/home">智能家居</Link>
        </Menu.Item>
        <Menu.Item
          key="3"
          icon={<IconFont style={{ fontSize: '24px' }} type="icon-yuanqu" />}
        >
          <Link to="/family/systems">智能安防</Link>
        </Menu.Item>
        <Menu.Item
          key="4"
          icon={<IconFont style={{ fontSize: '24px' }} type="icon-jiaju" />}
        >
          <Link to="/family/entertainment">智能娱乐</Link>
        </Menu.Item>
      </Menu>
    </div>
  )
}

export default FamilyMenu
