import React, { useState, useEffect, useContext } from 'react'
import './index.scss'
import IconFont from '../../common/IconFont/index'
import { DatePicker, Space, Tabs } from 'antd'
import HotelPanel from '../hotelPanel/index'
import ChartViewList from '../../common/chartViewList/index'
import 'moment/locale/zh-cn'
import locale from 'antd/es/date-picker/locale/zh_CN'
import HotelList from '../hotelList/insex'
import {
  getDevicesListUrl,
  getDevicesControllerUrl,
  getSceneId,
  getUserToken,
} from '../../../api/api'
import axios from 'axios'
import { UserContext } from '../../../router/index'

const { TabPane } = Tabs

const HotelContent = () => {
  axios.defaults.headers.common['Authorization'] = getUserToken()
  // 日期控件
  const handleDateChange = (date, dateString) => {
    console.log(date, dateString)
  }

  const [showDate, setShowDate] = useState(false)

  const onTabClick = key => {
    key === '2' ? setShowDate(true) : setShowDate(false)
  }

  const [list, setList] = useState([])

  // 请求数据配置
  const getSceneList = () => {
    return axios.post(getDevicesListUrl(), {
      sceneId: getSceneId().hotel,
      groupId: null,
      page: 1,
      size: 20,
    })
  }

  useEffect(() => {
    const fetchData = async () => {
      const result = await getSceneList()
      if (result.data.code === '10000') {
        setList(result.data.result.records)
      }
    }
    fetchData()
  }, [])

  const controlList = list.filter(
    item => item.classId !== 17 && item.classId !== 18
  )

  const operations = () => {
    return showDate ? (
      <Space direction="vertical">
        <DatePicker locale={locale} onChange={handleDateChange} />
      </Space>
    ) : null
  }

  // 组件图标
  const iconList = {
    20: {
      on: <IconFont style={{ fontSize: '60px' }} type="icon-dengpao" />,
      off: <IconFont style={{ fontSize: '60px' }} type="icon-dengpao1" />,
    },
    11: {
      on: <IconFont style={{ fontSize: '60px' }} type="icon-kongtiao1" />,
      off: <IconFont style={{ fontSize: '60px' }} type="icon-kongtiao" />,
    },
    19: {
      on: <IconFont style={{ fontSize: '60px' }} type="icon-chuanglian" />,
      off: <IconFont style={{ fontSize: '60px' }} type="icon-icon-test1" />,
    },
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

  // 数据更新
  const postDevicesController = (
    sceneId,
    groupId,
    deviceId,
    operationId,
    param = {}
  ) => {
    return axios.post(getDevicesControllerUrl(), {
      sceneId: sceneId,
      groupId: groupId,
      deviceId: deviceId,
      operationId: operationId,
      param: param,
    })
  }

  const updateData = async () => {
    const result = await getSceneList()
    if (result.data.code === '10000') {
      setList(result.data.result.records)
    }
  }

  const updateCurState = (deviceId, operationId, param) => {
    const fetchData = async () => {
      const result = await postDevicesController(
        getSceneId().hotel,
        -1,
        deviceId,
        operationId
      )
      if (result.data.code === '10000') {
        console.log(result.data)
      }
    }
    fetchData()
    setTimeout(() => {
      updateData()
    }, 300)
  }

  // mqtt 监听
  const userData = {
    cardId: '-- --',
    identityNumber: '-- --',
    name: '-- --',
    time: '-- --',
    stayCount: '-- --',
    prePaid: '-- --',
    roomNumber: '-- --',
  }

  const mqttData = useContext(UserContext)
  const [data, setData] = useState(userData)

  console.log(mqttData)

  if (mqttData.cardId && !mqttData.id) {
    data.cardId = mqttData.cardId
    data.identityNumber = '-- --'
    data.name = '-- --'
    data.time = '-- --'
    data.stayCount = '-- --'
    data.prePaid = '-- --'
    data.roomNumber = '-- --'
  } else if (mqttData.cardId && mqttData.id) {
    data.cardId = mqttData.cardId
    data.identityNumber = mqttData.identityNumber
    data.name = mqttData.name
    data.time = mqttData.checkInTime
    data.stayCount = mqttData.stayCount
    data.prePaid = mqttData.prePaid
    data.roomNumber = mqttData.roomNumber
  }

  return (
    <div className="hotel-content-box">
      <Tabs tabBarExtraContent={operations()} onTabClick={onTabClick}>
        <TabPane tab="智慧酒店" key="1">
          <div className="view-box-wrap">
            <ul>
              {controlList?.map(item => (
                <li key={item.id}>
                  <HotelList
                    iconList={iconList}
                    data={item}
                    updateCurState={updateCurState}
                  />
                </li>
              ))}
            </ul>
            <div className="view-box">
              <div className="view-box-first">
                <HotelPanel data={data} />
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
