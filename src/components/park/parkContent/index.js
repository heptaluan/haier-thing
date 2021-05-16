import React, { useState, useEffect, useContext } from 'react'
import './index.scss'
import IconFont from '../../common/IconFont/index'
import { DatePicker, Space, Tabs, message } from 'antd'
import ParkPanel from '../parkPanel/index'
import CameraComponent from '../../common/cameraComponent/index'
import 'moment/locale/zh-cn'
import locale from 'antd/es/date-picker/locale/zh_CN'
import ParkList from '../parkList/index'
import {
  getDevicesListUrl,
  getDevicesControllerUrl,
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

const ParkContent = () => {
  const history = useHistory()
  axios.defaults.headers.common['Authorization'] = getUserToken()
  const [accesslist, setAccessList] = useState([])

  const [showDate, setShowDate] = useState(false)

  // 日历控件显示
  const onTabClick = key => {
    key === '2' ? setShowDate(true) : setShowDate(false)
  }

  const handleDateChange = (date, dateString) => {
    getChartLatestData(accesslist, dateString)
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
          allList.find(item => item.classId === 3)?.id,
          allList.find(item => item.classId === 5)?.id,
          allList.find(item => item.classId === 2)?.id,
          allList.find(item => item.classId === 4)?.id,
        ],
        time
      )
      if (result && result.data.code === '10000') {
        setChartLatestData(formatLatestValue(allList, result.data.result))
      }
    }
    fetchData()
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
      on: <IconFont style={{ fontSize: '45px' }} type="icon-rentiganying" />,
      off: <IconFont style={{ fontSize: '45px' }} type="icon-rentiganying" />,
    },
    // 红外警戒
    4: {
      on: <IconFont style={{ fontSize: '45px' }} type="icon-hongwaijiance" />,
      off: <IconFont style={{ fontSize: '45px' }} type="icon-hongwaijiance" />,
    },
    // 烟雾
    2: {
      on: <IconFont style={{ fontSize: '60px' }} type="icon-yanwujiance_1" />,
      off: <IconFont style={{ fontSize: '60px' }} type="icon-yanwujiance_1" />,
    },
    // 燃气
    3: {
      on: <IconFont style={{ fontSize: '60px' }} type="icon-ranqi" />,
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
        getChartLatestData(result.data.result.records)
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

  // 更新数据
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

  const fetchData = async (deviceId, operationId, param = {}, checked) => {
    const result = await postDevicesController(
      getSceneId().park,
      -1,
      deviceId,
      operationId,
      param
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

  const updateData = async () => {
    const result = await getSceneList()
    if (result.data.code === '10000') {
      setAccessList(result.data.result.records)
    }
  }

  const updateCurState = (checked, data) => {
    switch (data.classId) {
      case 6:
      case 10:
        if (checked) {
          fetchData(
            data.id,
            data.operations.find(item => item.operation_type === 1).id,
            {},
            checked
          )
        } else {
          fetchData(
            data.id,
            data.operations.find(item => item.operation_type === 0).id,
            {},
            checked
          )
        }
        break
      case 2:
      case 3:
      case 4:
      case 5:
        if (checked) {
          fetchData(
            data.id,
            data.operations.find(item => item.operation_type === 7).id,
            {
              value: 1,
              jointDeviceId: accesslist.find(item => item.classId === 10).id,
            },
            checked
          )
        } else {
          fetchData(
            data.id,
            data.operations.find(item => item.operation_type === 7).id,
            {
              value: 0,
              jointDeviceId: accesslist.find(item => item.classId === 10).id,
            },
            checked
          )
        }
        break

      default:
        break
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
  // eslint-disable-next-line no-unused-vars
  const [data, setData] = useState(carData)

  if (mqttData.deviceId) {
    accesslist.map(item => {
      switch (item.classId) {
        case 3:
        case 5:
        case 4:
        case 2:
          if (item.id === mqttData.deviceId && item.latestData) {
            item.latestData.value = JSON.stringify({
              value: mqttData.value.value,
            })
            return item
          } else {
            return item
          }
        case 10:
          if (item.id === mqttData.deviceId) {
            return (item.latestData = {
              value: JSON.stringify({
                value: mqttData.value.value,
              }),
            })
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
    data.endTime = mqttData.endTime || '-- --'
    data.parkingCost = mqttData.parkingCost || '-- --'
  }

  return (
    <div className="park-content-box">
      <Tabs tabBarExtraContent={operations()} onTabClick={onTabClick}>
        <TabPane tab="智慧园区" key="1">
          <div className="view-box-wrap">
            <ul>
              {accesslist
                ?.filter(item => item.classId !== 17 && item.classId !== 6)
                .map(item => (
                  <li key={item.classId}>
                    <ParkList
                      iconList={iconList}
                      data={item}
                      updateCurState={updateCurState}
                    />
                  </li>
                ))}
            </ul>
            <div className="view-box">
              <div className="view-box-first park-panel">
                <ParkPanel setData={setData} data={data} list={accesslist} updateCurState={updateCurState} />
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
                item =>
                  item.id === 3 ||
                  item.id === 5 ||
                  item.id === 2 ||
                  item.id === 4
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

export default ParkContent
