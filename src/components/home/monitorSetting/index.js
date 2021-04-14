import React, { useState } from 'react'
import './index.scss'
import { Button } from 'antd'

const MonitorSetting = () => {
  const [visible, setVisible] = useState(false)

  return (
    <>
      <Button
        type="text"
        onClick={() => {
          setVisible(true)
        }}
      >
        监控设置
      </Button>
    </>
  )
}

export default MonitorSetting
