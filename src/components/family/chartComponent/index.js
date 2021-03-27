import React, { useState } from 'react'
import { Modal, Button } from 'antd'
import './index.scss'
import { Recharts, Components } from 'react-component-echarts'
import 'echarts'
import IconFont from '../../common/IconFont/index'

const ChartComponent = props => {
  const [isModalVisible, setIsModalVisible] = useState(false)

  

  const showModal = () => {
    setIsModalVisible(true)
  }

  const handleOk = () => {
    setIsModalVisible(false)
  }

  const handleCancel = () => {
    setIsModalVisible(false)
  }

  return (
    <div>
      <div className="img-box">
        <IconFont style={{ fontSize: '80px' }} type="icon-thermometer" />   
      </div>
      <p>温度：{props.data.temperature}</p>
      <p>湿度：{props.data.humidity}</p>
      <Button onClick={showModal} type="text">
        图表展示
      </Button>
    </div>
  )
}

export default ChartComponent
