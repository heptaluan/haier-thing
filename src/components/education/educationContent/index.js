import React, { useState, useEffect, useContext } from 'react'
import './index.scss'
import IconFont from '../../common/IconFont/index'
import { DatePicker, Space, Tabs } from 'antd'
import EducationControl from '../educationControl/index'
import CameraComponent from '../../common/cameraComponent/index'
import ChartViewList from '../../common/chartViewList/index'
import EducationList from '../educationList/index'
import 'moment/locale/zh-cn'
import locale from 'antd/es/date-picker/locale/zh_CN'
import { getDevicesListUrl, getSceneId, getUserToken } from '../../../api/api'
import axios from 'axios'
import { UserContext } from '../../../router/index'

const { TabPane } = Tabs

const EducationContent = () => {
  axios.defaults.headers.common['Authorization'] = getUserToken()
  const [list, setList] = useState([])

  // 请求数据配置
  const getSceneList = () => {
    return axios.post(getDevicesListUrl(), {
      sceneId: getSceneId().education,
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

  // 组件图标
  const iconList = {
    15: {
      off: <IconFont style={{ fontSize: '60px' }} type="icon-thermometer" />,
    },
    16: {
      off: <IconFont style={{ fontSize: '60px' }} type="icon-wenshidu-" />,
    },
    14: {
      off: <IconFont style={{ fontSize: '60px' }} type="icon-icon-test" />,
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

  // mqtt 监听
  const userData = {
    cardId: '-- --',
    courseName: '-- --',
    startTime: '-- --',
    endTime: '-- --',
    name: '-- --',
    studentCount: '-- --',
  }
  const mqttData = useContext(UserContext)
  const [data, setData] = useState(userData)

  console.log(mqttData)
  
  if (mqttData.deviceId) {
    controlList.map(item => {
      switch (item.classId) {
        case 16:
        case 15:
        case 14:
          if (item.id === mqttData.deviceId) {
            return (item.latestData.value = JSON.stringify({value: mqttData.value.value}))
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
    data.courseName = '-- --'
    data.startTime = '-- --'
    data.endTime = '-- --'
    data.name = '-- --'
    data.studentCount = '-- --'
  } else if (mqttData.cardId && mqttData.id) {
    data.cardId = mqttData.cardId
    data.courseName = mqttData.courseName
    data.startTime = mqttData.startTime
    data.endTime = mqttData.endTime
    data.name = mqttData.name
    data.studentCount = mqttData.studentCount
  }

  return (
    <div className="education-box">
      <Tabs tabBarExtraContent={operations()} onTabClick={onTabClick}>
        <TabPane tab="智慧教育" key="1">
          <div className="view-box-wrap">
            <ul>
              {controlList?.map(item => (
                <li key={item.id}>
                  <EducationList
                    iconList={iconList[item.classId]?.off}
                    data={item}
                  />
                </li>
              ))}
            </ul>
            <div className="view-box">
              <div className="view-box-first">
                <EducationControl data={data} />
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

export default EducationContent
