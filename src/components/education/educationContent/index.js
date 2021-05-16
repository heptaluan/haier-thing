import React, { useState, useEffect, useContext } from 'react'
import './index.scss'
import IconFont from '../../common/IconFont/index'
import { DatePicker, Space, Tabs, message } from 'antd'
import EducationControl from '../educationControl/index'
import CameraComponent from '../../common/cameraComponent/index'
import EducationList from '../educationList/index'
import 'moment/locale/zh-cn'
import locale from 'antd/es/date-picker/locale/zh_CN'
import {
  getDevicesListUrl,
  getSceneId,
  getUserToken,
  getLatestDataUrl,
} from '../../../api/api'
import axios from 'axios'
import { UserContext } from '../../../router/index'
import { useHistory } from 'react-router-dom'
import { formatLatestValue, formatDate } from '../../../util/index'
import ChartLineComponent from '../../common/chartLineComponent/index'

const { TabPane } = Tabs

const EducationContent = () => {
  const history = useHistory()
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
        getChartLatestData(result.data.result.records)
      } else if (result.data.code === '30000') {
        message.error(`已登出，请从新登录`)
        localStorage.setItem(
          'userInfo',
          JSON.stringify({
            user: '',
            role: '',
            name: ''
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

  // 日期选择事件
  const handleDateChange = (date, dateString) => {}

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

  // 获取所有数据
  const [chartLatestData, setChartLatestData] = useState([])

  const getLatestData = (list, time) => {
    return axios.post(getLatestDataUrl(), {
      deviceId: list,
      start: time ? `${time} 00:00:00` : `${formatDate('yyyy-MM-dd')} 00:00:00`,
      end: time ? `${time} 23:59:59` : `${formatDate('yyyy-MM-dd')} 23:59:59`,
    })
  }

  const getChartLatestData = (allList, time) => {
    const fetchData = async () => {
      const result = await getLatestData(
        [
          allList.find(item => item.classId === 16)?.id,
          allList.find(item => item.classId === 15)?.id,
          allList.find(item => item.classId === 14)?.id,
        ],
        time
      )
      if (result && result.data.code === '10000') {
        setChartLatestData(formatLatestValue(allList, result.data.result))
      }
    }
    fetchData()
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

  // eslint-disable-next-line no-unused-vars
  const [data, setData] = useState(userData)

  if (mqttData.deviceId) {
    controlList.map(item => {
      switch (item.classId) {
        case 16:
        case 15:
        case 14:
          if (item.id === mqttData.deviceId && item.latestData) {
            item.latestData.value = JSON.stringify({
              value: mqttData.value.value,
            })
            if (item.active === undefined) {
              item.active = true
            }
            item.active = !item.active
            return item
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
              <div className="view-box-first education-view-box">
                <EducationControl setData={setData} data={data} />
              </div>
              <div className="view-box-last">
                <CameraComponent />
              </div>
            </div>
          </div>
        </TabPane>
        <TabPane tab="历史数据" key="2">
          <div className="chart-list-box">
            {chartLatestData
              .filter(
                item => item.id === 16 || item.id === 15 || item.id === 14
              )
              .map(item => (
                <div key={item.id} className="chart-box">
                  <ChartLineComponent
                    type={item.type}
                    title={item.title}
                    x={item.x}
                    y={item.y}
                  />
                </div>
              ))}
          </div>
        </TabPane>
      </Tabs>
    </div>
  )
}

export default EducationContent
