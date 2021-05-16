import React, { useState, useEffect, useContext } from 'react'
import './index.scss'
import IconFont from '../../common/IconFont/index'
import { DatePicker, Space, Tabs, message } from 'antd'
import HotelPanel from '../hotelPanel/index'
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
import { useHistory } from 'react-router-dom'

const { TabPane } = Tabs

const HotelContent = () => {
  const history = useHistory()
  axios.defaults.headers.common['Authorization'] = getUserToken()
  // 日期控件
  const handleDateChange = (date, dateString) => {}

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
      } else if (result.data.code === '30000') {
        message.error(`已登出，请从新登录`)
        localStorage.setItem(
          'userInfo',
          JSON.stringify({
            user: '',
            role: '',
            name: '',
          })
        )
        history.push('/login')
      } else if (result.data.code === '40000') {
        message.error(`软件未授权`)
        localStorage.setItem(
          'userInfo',
          JSON.stringify({
            user: '',
            role: '',
            name: ''
          })
        ) 
        history.push('/login')
      }
    }
    fetchData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
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

  const updateCurState = (deviceId, operationId, checked) => {
    const fetchData = async () => {
      const result = await postDevicesController(
        getSceneId().hotel,
        -1,
        deviceId,
        operationId
      )
      if (result.data.result) {
        setTimeout(() => {
          if (checked) {
            message.success(`开启成功`)
          } else {
            message.success(`关闭成功`)
          }
        }, 1500)
      } else {
        setTimeout(() => {
          if (checked) {
            message.success(`开启失败，请重新尝试`)
          } else {
            message.success(`关闭失败，请重新尝试`)
          }
        }, 1500)
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

  // eslint-disable-next-line no-unused-vars
  const [data, setData] = useState(userData)

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
                <HotelPanel setData={setData} data={data} />
              </div>
            </div>
          </div>
        </TabPane>
        {/* <TabPane tab="历史数据" key="2">
          
        </TabPane> */}
      </Tabs>
    </div>
  )
}

export default HotelContent
