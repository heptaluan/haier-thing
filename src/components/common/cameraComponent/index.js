import React from 'react'
import './index.scss'

const CameraComponent = () => {
  return (
    <div className="family-menu">
      <Menu
        style={{ width: 200, paddingTop: 50 }}
        mode="inline"
        theme="light"
        defaultSelectedKeys={['/family/home']}
        selectedKeys={[history.location.pathname]}
      >
        <Menu.Item
          key="/"
          icon={<IconFont style={{ fontSize: '24px' }} type="icon-jiaju" />}
        >
          <Link to="/">首页</Link>
        </Menu.Item>
      </Menu>
    </div>
  )
}

export default CameraComponent
