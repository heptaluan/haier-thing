import React, { useState } from 'react'
import './index.scss'
import IconFont from '../../common/IconFont/index'
import { DatePicker, Space, Tabs } from 'antd'
import EducationControl from '../educationControl/index'
import CameraComponent from '../../common/cameraComponent/index'
import ChartViewList from '../../common/chartViewList/index'
import 'moment/locale/zh-cn'
import locale from 'antd/es/date-picker/locale/zh_CN'

const { TabPane } = Tabs

const EducationContent = () => {
  const tempStatus = {
    temperature: '---',
    humidity: '---',
    illumination: '---',
    chartData: {
      xAxis: [],
      temperature: [],
      humidity: [],
      illumination: [],
    },
  }

  const handleDateChange = (date, dateString) => {
    console.log(date, dateString)
  }

  const [showDate, setShowDate] = useState(false)

  const onTabClick = key => {
    key === '2' ? setShowDate(true) : setShowDate(false)
  }

  const operations = () => {
    return showDate ? (
      <Space direction="vertical">
        <DatePicker locale={locale} onChange={handleDateChange} />
      </Space>
    ) : null
  }

  return (
    <div className="education-box">
      <Tabs tabBarExtraContent={operations()} onTabClick={onTabClick}>
        <TabPane tab="智慧教育" key="1">
          <div className="view-box-wrap">
            <ul>
              <li>
                <div className="icon-box">
                  <IconFont
                    style={{ fontSize: '60px' }}
                    type="icon-thermometer"
                  />
                </div>
                <div className="controls-name">
                  <span>温度计</span>
                  <span>设备id：123</span>
                </div>
                <div className="controls-on">
                  <span>30度</span>
                </div>
              </li>
              <li>
                <div className="icon-box">
                  <IconFont
                    style={{ fontSize: '60px' }}
                    type="icon-wenshidu-"
                  />
                </div>
                <div className="controls-name">
                  <span>湿度计</span>
                  <span>设备id：123</span>
                </div>
                <div className="controls-on">
                  <span>30度</span>
                </div>
              </li>
              <li>
                <div className="icon-box">
                  <IconFont
                    style={{ fontSize: '60px' }}
                    type="icon-icon-test"
                  />
                </div>
                <div className="controls-name">
                  <span>光照强度</span>
                  <span>设备id：123</span>
                </div>
                <div className="controls-on">
                  <span>30度</span>
                </div>
              </li>
            </ul>
            <div className="view-box">
              <div className="view-box-first">
                <EducationControl />
              </div>
              <div className="view-box-last">
                <CameraComponent />
              </div>
            </div>
          </div>
        </TabPane>
        <TabPane tab="历史数据" key="2">
          <ChartViewList tempStatus={tempStatus} />
        </TabPane>
      </Tabs>
    </div>
  )
}

export default EducationContent
