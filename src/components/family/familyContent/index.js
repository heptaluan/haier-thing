import React, { useState, useEffect } from 'react'
import ChartComponent from '../../common/chartComponent/index'
import ChartViewList from '../../common/chartViewList/index'
import IconFont from '../../common/IconFont/index'
import './index.scss'
// import useMqtt from '../../../hook/useMqtt'
import axios from 'axios'
import { getDevicesListUrl, getLatestDataUrl } from '../../../api/api'
import { findRecordsValue, formatLatestValue } from '../../../util/index'
import { Tabs, DatePicker, Space } from 'antd'
import ControlsList from '../controlsList/index'
import AccessList from '../accessList/index'
import 'moment/locale/zh-cn'
import locale from 'antd/es/date-picker/locale/zh_CN'

const { TabPane } = Tabs

const FamilyContent = () => {
  const [data, setData] = useState({})

  // 日期选择事件
  const handleDateChange = (date, dateString) => {
    console.log(date, dateString)
  }

  const [showDate, setShowDate] = useState(false)

  const onTabClick = key => {
    key === '3' ? setShowDate(true) : setShowDate(false)
  }

  const operations = () => {
    return showDate ? (
      <Space direction="vertical">
        <DatePicker locale={locale} onChange={handleDateChange} />
      </Space>
    ) : null
  }

  const getDevicesList = () => {
    return axios.post(getDevicesListUrl(), {
      sceneId: 1,
      groupId: null,
      page: 1,
      size: 20,
    })
  }

  const getLatestData = () => {
    return axios.post(getLatestDataUrl(), {
      deviceId: [1, 2],
      start: '2021-03-20 08:04:31',
      end: '2021-03-23 08:04:31',
    })
  }

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.all([getDevicesList(), getLatestData()])
      setData(result)
    }
    fetchData()
  }, [])

  // 温度计 && 光照
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

  if (data[0] && data[0].data.result) {
    const records = data[0].data.result.records
    tempStatus.temperature = findRecordsValue(records, 4)
    tempStatus.humidity = findRecordsValue(records, 5)
    tempStatus.illumination = findRecordsValue(records, 3)
  }

  if (data[1]) {
    tempStatus.chartData = formatLatestValue(data[1].data.result || [])
  }

  // 智能家居
  const controlsList = [
    {
      id: 1,
      onIcon: <IconFont style={{ fontSize: '60px' }} type="icon-thermometer" />,
      offIcon: null,
      title: '温度计',
      state: true,
      firstVal: '32',
      lastVal: '15',
    },
    {
      id: 2,
      onIcon: <IconFont style={{ fontSize: '60px' }} type="icon-icon-test" />,
      offIcon: null,
      title: '光照强度',
      state: true,
      firstVal: '123',
      lastVal: null,
    },
    {
      id: 3,
      onIcon: <IconFont style={{ fontSize: '60px' }} type="icon-ranqi" />,
      offIcon: <IconFont style={{ fontSize: '60px' }} type="icon-ranqi" />,
      title: '燃气检测',
      state: false,
      firstVal: '正常',
      lastVal: null,
    },
    {
      id: 4,
      onIcon: (
        <IconFont style={{ fontSize: '60px' }} type="icon-jingbaobaojing1" />
      ),
      offIcon: (
        <IconFont style={{ fontSize: '60px' }} type="icon-jingbaobaojing" />
      ),
      title: '紧急报警',
      state: true,
      firstVal: '正常',
      lastVal: null,
    },
    {
      id: 5,
      onIcon: <IconFont style={{ fontSize: '60px' }} type="icon-dengpao" />,
      offIcon: <IconFont style={{ fontSize: '60px' }} type="icon-dengpao1" />,
      title: '智能灯光',
      state: false,
      firstVal: '开启灯光',
      lastVal: '关闭灯光',
    },
    {
      id: 6,
      onIcon: <IconFont style={{ fontSize: '60px' }} type="icon-chazuo-" />,
      offIcon: (
        <IconFont
          style={{ fontSize: '60px' }}
          type="icon-hekriconshebeichazuoxianxing"
        />
      ),
      title: '智能开关',
      state: true,
      firstVal: '开启通电',
      lastVal: '关闭通电',
    },
    {
      id: 7,
      onIcon: <IconFont style={{ fontSize: '60px' }} type="icon-kongtiao1" />,
      offIcon: <IconFont style={{ fontSize: '60px' }} type="icon-kongtiao" />,
      title: '智能空调',
      state: false,
      firstVal: '开启空调',
      lastVal: '关闭空调',
    },
    {
      id: 8,
      onIcon: <IconFont style={{ fontSize: '60px' }} type="icon-chuanglian" />,
      offIcon: <IconFont style={{ fontSize: '60px' }} type="icon-icon-test1" />,
      title: '智能窗帘',
      state: true,
      firstVal: '开启窗帘',
      lastVal: '关闭窗帘',
    },
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

  // 智能安防
  const accessList = [
    {
      id: 1,
      onIcon: (
        <IconFont style={{ fontSize: '45px' }} type="icon-rentiganying" />
      ),
      title: '人体感应',
      stateText: '正常',
      state: true,
    },
    {
      id: 2,
      onIcon: (
        <IconFont style={{ fontSize: '45px' }} type="icon-hongwaijiance" />
      ),
      title: '红外警戒',
      stateText: '正常',
      state: true,
    },
    {
      id: 3,
      onIcon: (
        <IconFont style={{ fontSize: '45px' }} type="icon-yanwujiance_1" />
      ),
      offIcon: null,
      title: '烟雾感应',
      stateText: '正常',
      state: false,
    },
    {
      id: 4,
      onIcon: (
        <IconFont style={{ fontSize: '45px' }} type="icon-jingbaobaojing1" />
      ),
      offIcon: (
        <IconFont style={{ fontSize: '45px' }} type="icon-jingbaobaojing" />
      ),
      title: '紧急报警',
      stateText: '正常',
      state: false,
    },
  ]

  const [accessStates, setAccessState] = useState(accessList)

  const updateAccessState = (id, checked) => {
    const updateData = accessStates.map(item => {
      if (item.id === id) {
        item.state = checked
        if (id === 4) {
          item.stateText = checked ? '警告' : '正常'
        }
        return item
      }
      return item
    })
    setAccessState(updateData)
  }

  return (
    <div className="family-wrap">
      <div className="family-home">
        <Tabs tabBarExtraContent={operations()} onTabClick={onTabClick}>
          <TabPane tab="智能家居" key="1">
            <div className="controls-box">
              <ul>
                {states.map(item => (
                  <li key={item.id} className="controls-list">
                    <ControlsList data={item} updateCurState={updateCurState} />
                  </li>
                ))}
              </ul>
              <div className="chart-box">
                <div className="chart-component">
                  <ChartComponent data={tempStatus} />
                </div>
                <div className="chart-component">
                  <ChartComponent data={tempStatus} />
                </div>
              </div>
            </div>
          </TabPane>
          <TabPane tab="智能安防" key="2">
            <AccessList
              updateAccessState={updateAccessState}
              list={accessStates}
            />
          </TabPane>
          <TabPane tab="历史数据" key="3">
            <ChartViewList tempStatus={tempStatus} />
          </TabPane>
        </Tabs>
      </div>
    </div>
  )
}

export default FamilyContent
