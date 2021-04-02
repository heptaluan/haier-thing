import React, { useState } from 'react'
import './index.scss'
import IconFont from '../../common/IconFont/index'
import { DatePicker, Space, Tabs } from 'antd'
import HotelPanel from '../hotelPanel/index'
import ChartViewList from '../../common/chartViewList/index'
import 'moment/locale/zh-cn'
import locale from 'antd/es/date-picker/locale/zh_CN'
import HotelList from '../hotelList/insex'

const { TabPane } = Tabs

const HotelContent = () => {
  // 日期控件
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

  // 组件状态
  const controlsList = [
    {
      id: 1,
      onIcon: <IconFont style={{ fontSize: '60px' }} type="icon-dengpao" />,
      offIcon: <IconFont style={{ fontSize: '60px' }} type="icon-dengpao1" />,
      title: '智能灯光',
      state: false,
      firstVal: '开启灯光',
      lastVal: '关闭灯光',
    },
    {
      id: 2,
      onIcon: <IconFont style={{ fontSize: '60px' }} type="icon-kongtiao1" />,
      offIcon: <IconFont style={{ fontSize: '60px' }} type="icon-kongtiao" />,
      title: '智能空调',
      state: false,
      firstVal: '开启空调',
      lastVal: '关闭空调',
    },
    {
      id: 3,
      onIcon: <IconFont style={{ fontSize: '60px' }} type="icon-chuanglian" />,
      offIcon: <IconFont style={{ fontSize: '60px' }} type="icon-icon-test1" />,
      title: '智能窗帘',
      state: true,
      firstVal: '开启窗帘',
      lastVal: '关闭窗帘',
    }
  ]

  const [states, setState] = useState(controlsList)

  const updateCurState = (id, target) => {
    const updateData = states.map(item => {
      if (item.id === id) {
        item.state = target
        return item
      }
      return item
    })
    setState(updateData)
  }

  // 图表数据
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

  return (
    <div className="hotel-content-box">
      <Tabs tabBarExtraContent={operations()} onTabClick={onTabClick}>
        <TabPane tab="智慧酒店" key="1">
          <div className="view-box-wrap">
            <ul>
              {states.map(item => (
                <li key={item.id}>
                  <HotelList data={item} updateCurState={updateCurState} />
                </li>
              ))}
            </ul>
            <div className="view-box">
              <div className="view-box-first">
                <HotelPanel />
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

export default HotelContent
