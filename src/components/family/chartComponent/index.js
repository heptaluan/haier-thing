import React, { useState } from 'react'
import { Modal, Button } from 'antd'
import './index.scss'
import { Recharts, Components } from 'react-component-echarts'
import 'echarts'
import IconFont from '../../common/IconFont/index'

const {
  SplitLine,
  Tooltip,
  Legend,
  XAxis,
  Grid,
  YAxis,
  Series,
} = Components

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
    <div className="chart-component">
      <div className="box">
        <h4 className="title">温度计</h4>
        <div className="img-box">
          <IconFont style={{ fontSize: '80px' }} type="icon-thermometer" />   
        </div>
        <p>温度：{props.data.temperature}</p>
        <p>湿度：{props.data.humidity}</p>
        <Button onClick={showModal} type="text">
          图表展示
        </Button>
      </div>
      <div className="box">
        <h4 className="title">光照强度</h4>
        <div className="img-box">
          <IconFont style={{ fontSize: '80px' }} type="icon-icon-test" />
        </div>
        <p>光照：{props.data.illumination}</p>
        <Button onClick={showModal} type="text">
          图表展示
        </Button>
      </div>
      <Modal visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
        <div className="chart-box">
          <Recharts>
            <Tooltip trigger="item" formatter="{a} : {c}" />
            <Legend left="left" data={['温度', '湿度', '光照']} />
            <XAxis
              type="category"
              data={props.data.chartData.xAxis}
            >
              <SplitLine show={false} />
            </XAxis>
            <Grid left="3%" right="4%" bottom="3%" containLabel={true} />
            <YAxis type="log" minorSplitLine={{ show: true }} />
            <Series
              name="温度"
              type="line"
              data={props.data.chartData.temperature}
            />
            <Series
              name="湿度"
              type="line"
              data={props.data.chartData.humidity}
            />
            <Series
              name="光照"
              type="line"
              data={props.data.chartData.illumination}
            />
          </Recharts>
        </div>
      </Modal>
    </div>
  )
}

export default ChartComponent
