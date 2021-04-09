import React, { useState, useEffect, useContext } from 'react'
import './index.scss'
import IconFont from '../../common/IconFont/index'
import { DatePicker, Space, Tabs } from 'antd'
import ParkPanel from '../parkPanel/index'
import CameraComponent from '../../common/cameraComponent/index'
import ChartViewList from '../../common/chartViewList/index'
import 'moment/locale/zh-cn'
import locale from 'antd/es/date-picker/locale/zh_CN'
import ParkList from '../parkList/index'
import { getDevicesListUrl, getDevicesControllerUrl, getSceneId, getUserToken } from '../../../api/api'
import axios from 'axios'
import { UserContext } from '../../../router/index'

const { TabPane } = Tabs

const ParkContent = () => {
  axios.defaults.headers.common['Authorization'] = getUserToken()
  const [accesslist, setAccessList] = useState([])

  const [showDate, setShowDate] = useState(false)

  // 日历控件显示
  const onTabClick = key => {
    key === '2' ? setShowDate(true) : setShowDate(false)
  }

  const handleDateChange = (date, dateString) => {
    console.log(date, dateString)
  }

  const operations = () => {
    return showDate ? (
      <Space direction="vertical">
        <DatePicker locale={locale} onChange={handleDateChange} />
      </Space>
    ) : null
  }

  // 请求数据配置
  const getSceneList = () => {
    return axios.post(getDevicesListUrl(), {
      sceneId: getSceneId().park,
      groupId: null,
      page: 1,
      size: 20,
    })
  }

  const iconList = {
    // 人体感应
    5: {
      off: <IconFont style={{ fontSize: '45px' }} type="icon-rentiganying" />,
    },
    // 红外警戒
    4: {
      off: <IconFont style={{ fontSize: '45px' }} type="icon-hongwaijiance" />,
    },
    // 烟雾
    2: {
      off: <IconFont style={{ fontSize: '60px' }} type="icon-yanwujiance_1" />,
    },
    // 燃气
    3: {
      off: <IconFont style={{ fontSize: '60px' }} type="icon-ranqi" />,
    },
    // 报警灯
    10: {
      on: <IconFont style={{ fontSize: '60px' }} type="icon-jingbaobaojing1" />,
      off: <IconFont style={{ fontSize: '60px' }} type="icon-jingbaobaojing" />,
    },
  }

  useEffect(() => {
    const fetchData = async () => {
      const result = await getSceneList()
      if (result.data.code === '10000') {
        setAccessList(result.data.result.records)
      }
    }
    fetchData()
  }, [])

  // 更新数据
  const postDevicesController = (sceneId, groupId, deviceId, operationId, param = {}) => {
    return axios.post(getDevicesControllerUrl(), {
      sceneId: sceneId,
      groupId: groupId,
      deviceId: deviceId,
      operationId: operationId,
      param: param
    })
  }

  const fetchData = async (deviceId, operationId, param = {}) => {
    const result = await postDevicesController(getSceneId().park, -1, deviceId, operationId, param)
    console.log(result.data)
  }

  const updateData = async () => {
    const result = await getSceneList()
    if (result.data.code === '10000') {
      setAccessList(result.data.result.records)
    }
  }

  const updateCurState = (checked, data) => {
    switch (data.classId) {
      case 10:
        if (checked) {
          fetchData(data.id, data.operations.find(item => item.operation_type === 1).id)
        } else {
          fetchData(data.id, data.operations.find(item => item.operation_type === 0).id)
        }
        break;
      case 2:
      case 3:
      case 4:
      case 5:
        if (checked) {
          fetchData(data.id, data.operations.find(item => item.operation_type === 7).id, {
            value: 1,
            jointDeviceId: accesslist.find(item => item.classId === 10).id
          })
        } else {
          fetchData(data.id, data.operations.find(item => item.operation_type === 7).id, {
            value: 0,
            jointDeviceId: accesslist.find(item => item.classId === 10).id
          })
        }
        break;
    
      default:
        break;
    }
    // 更新数据
    setTimeout(() => {
      updateData()
    }, 300)
  }

  // mqtt 监听
  const carData = {
    cardId: '-- --',
    carPlate: '-- --',
    startTime: '-- --',
    endTime: '-- --',
    prePaid: '-- --',
  }
  const mqttData = useContext(UserContext)
  const [data, setData] = useState(carData)
  
  if (mqttData.deviceId) {
    accesslist.map(item => {
      switch (item.classId) {
        case 3:
        case 5:
        case 4:
        case 2:
          if (item.id === mqttData.deviceId) {
            return item.deviceState = mqttData.value.value
          } else {
            return item
          }
        default:
          return item
      }
    })
  }

  if (mqttData.cardId && !mqttData.id) {
    data.cardId = mqttData.cardId
    data.carPlate = '-- --'
    data.startTime = '-- --'
    data.endTime = '-- --'
    data.parkingCost = '-- --'
  } else if (mqttData.cardId && mqttData.id) {
    data.cardId = mqttData.cardId
    data.carPlate = mqttData.carPlate
    data.startTime = mqttData.startTime
    data.endTime = mqttData.endTime
    data.parkingCost = mqttData.parkingCost
  }

  return (
    <div className="park-content-box">
      <Tabs tabBarExtraContent={operations()} onTabClick={onTabClick}>
        <TabPane tab="智慧园区" key="1">
          <div className="view-box-wrap">
            <ul>
              {accesslist?.filter(item => item.classId !== 17).map(item => (
                <li key={item.classId}>
                  <ParkList iconList={iconList[item.classId]?.off} data={item} updateCurState={updateCurState} />
                </li>
              ))}
            </ul>
            <div className="view-box">
              <div className="view-box-first">
                <ParkPanel data={data} />
              </div>
              <div className="view-box-last">
                <CameraComponent />
              </div>
            </div>
          </div>
        </TabPane>
        <TabPane tab="历史数据" key="2">
          <ChartViewList />
        </TabPane>
      </Tabs>
    </div>
  )
}

export default ParkContent
