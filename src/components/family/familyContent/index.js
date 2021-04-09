import React, { useState, useEffect, useContext } from 'react'
import ChartLineComponent from '../../common/chartLineComponent/index'
import ChartViewList from '../../common/chartViewList/index'
import IconFont from '../../common/IconFont/index'
import './index.scss'
import axios from 'axios'
import {
  getDevicesListUrl,
  getLatestDataUrl,
  getDevicesControllerUrl,
  getSceneId,
  getUserToken
} from '../../../api/api'
import { formatLatestValue, formatDate } from '../../../util/index'
import { Tabs, DatePicker, Space } from 'antd'
import ControlsList from '../controlsList/index'
import AccessList from '../accessList/index'
import 'moment/locale/zh-cn'
import locale from 'antd/es/date-picker/locale/zh_CN'
import MusicComponent from '../../common/musicComponent/index'
import { UserContext } from '../../../router/index'

const { TabPane } = Tabs

const FamilyContent = () => {
  axios.defaults.headers.common['Authorization'] = getUserToken()
  const [controlslist, setControlslist] = useState([])
  const [accesslist, setAccessList] = useState([])

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

  // 请求参数
  const getSceneOneList = () => {
    return axios.post(getDevicesListUrl(), {
      sceneId: getSceneId().family,
      groupId: 1,
      page: 1,
      size: 20,
    })
  }

  const getSceneTwoList = () => {
    return axios.post(getDevicesListUrl(), {
      sceneId: getSceneId().family,
      groupId: 2,
      page: 1,
      size: 20,
    })
  }

  // 智能家居
  const controlsIconList = {
    // 湿度
    16: {
      off: <IconFont style={{ fontSize: '60px' }} type="icon-wenshidu-" />,
    },
    // 光照
    14: {
      off: <IconFont style={{ fontSize: '60px' }} type="icon-icon-test" />,
    },
    // 温度
    15: {
      off: <IconFont style={{ fontSize: '60px' }} type="icon-thermometer" />,
    },
    // 燃气
    3: {
      on: <IconFont style={{ fontSize: '60px' }} type="icon-ranqi" />,
      off: <IconFont style={{ fontSize: '60px' }} type="icon-ranqi" />,
    },
    // 灯光
    8: {
      on: <IconFont style={{ fontSize: '60px' }} type="icon-dengpao" />,
      off: <IconFont style={{ fontSize: '60px' }} type="icon-dengpao1" />,
    },
    // 报警灯
    10: {
      on: <IconFont style={{ fontSize: '60px' }} type="icon-jingbaobaojing1" />,
      off: <IconFont style={{ fontSize: '60px' }} type="icon-jingbaobaojing" />,
    },
    // 空调
    11: {
      on: <IconFont style={{ fontSize: '60px' }} type="icon-kongtiao1" />,
      off: <IconFont style={{ fontSize: '60px' }} type="icon-kongtiao" />,
    },
    // 窗帘
    19: {
      on: <IconFont style={{ fontSize: '60px' }} type="icon-chuanglian" />,
      off: <IconFont style={{ fontSize: '60px' }} type="icon-icon-test1" />,
    },
  }

  useEffect(() => {
    const fetchData = async () => {
      const result = await getSceneOneList()
      if (result.data.code === '10000') {
        setControlslist(result.data.result.records)
      }
    }
    fetchData()
  }, [])

  const handleSwitchChange = async (groupId, deviceId, operationId, param = {}) => {
    const result = await postDevicesController(
      getSceneId().family,
      groupId,
      deviceId,
      operationId,
      param
    )
    console.log(result.data)
  }

  const updateSwitchState = (checked, data, id) => {
    switch (data.classId) {
      case 10:
        if (checked) {
          handleSwitchChange(
            id,
            data.id,
            data.operations.find(item => item.operation_type === 1).id
          )
        } else {
          handleSwitchChange(
            id,
            data.id,
            data.operations.find(item => item.operation_type === 0).id
          )
        }
        break
      case 3:
      case 5:
      case 4:
      case 2:
        if (checked) {
          handleSwitchChange(
            id,
            data.id,
            data.operations.find(item => item.operation_type === 7).id,
            {
              value: 1,
              jointDeviceId: controlslist.find(item => item.classId === 10).id,
            }
          )
        } else {
          handleSwitchChange(
            id,
            data.id,
            data.operations.find(item => item.operation_type === 7).id,
            {
              value: 0,
              jointDeviceId: controlslist.find(item => item.classId === 10).id,
            }
          )
        }
        break

      default:
        break
    }
    if (id === 1) {
      setTimeout(() => {
        updateData()
      }, 300)
    } else {
      setTimeout(() => {
        updateAccessData()
      }, 300)
    }
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
    const result = await getSceneOneList()
    if (result.data.code === '10000') {
      setControlslist(result.data.result.records)
    }
  }

  const updateAccessData = async () => {
    const result = await getSceneTwoList()
    if (result.data.code === '10000') {
      setAccessList(result.data.result.records)
    }
  }

  const updateCurState = (deviceId, operationId, param) => {
    const fetchData = async () => {
      const result = await postDevicesController(
        getSceneId().family,
        1,
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

  // 智能安防
  useEffect(() => {
    const fetchData = async () => {
      const result = await getSceneTwoList()
      if (result.data.code === '10000') {
        setAccessList(result.data.result.records)
      }
    }
    fetchData()
  }, [])

  // mqtt 监听
  const mqttData = useContext(UserContext)
  console.log(mqttData)
  if (mqttData.deviceId) {
    controlslist.map(item => {
      switch (item.classId) {
        case 3:
        case 5:
        case 4:
        case 2:
          if (item.id === mqttData.deviceId) {
            return (item.deviceState = mqttData.value.value)
          } else {
            return item
          }
        case 16:
        case 15:
        case 14:
          if (item.id === mqttData.deviceId) {
            return (item.latestData.value = JSON.stringify({
              value: mqttData.value.value,
            }))
          } else {
            return item
          }
        default:
          return item
      }
    })
    accesslist.map(item => {
      switch (item.classId) {
        case 5:
        case 4:
        case 2:
          if (item.id === mqttData.deviceId) {
            return (item.deviceState = mqttData.value.value)
          } else {
            return item
          }
        default:
          return item
      }
    })
  }

  const userData = {
    cardId: '-- --',
  }
  const [lockData, setLockData] = useState(userData)

  if (mqttData.cardId && !mqttData.id) {
    lockData.cardId = mqttData.cardId
  } else if (mqttData.cardId && mqttData.id) {
    lockData.cardId = mqttData.cardId
  }

  // 图表数据
  const [chartData, setChartData] = useState([])

  const getLatestData = () => {
    return axios.post(getLatestDataUrl(), {
      deviceId: [185, 186, 187],
      start: `${formatDate('yyyy-MM-dd')} 00:00:00`,
      end: `${formatDate('yyyy-MM-dd')} 23:59:59`,
    })
  }

  // 温度计 && 光照
  useEffect(() => {
    const fetchData = async () => {
      const result = await getLatestData()
      if (result.data.code === '10000') {
        setChartData(result.data.result)
      }
    }
    fetchData()
  }, [])

  const formatTempStatus = formatLatestValue(chartData)

  return (
    <div className="family-wrap">
      <div className="family-home">
        <div className="music-box">
          <MusicComponent sceneId={getSceneId().family} groupId={3} />
        </div>
        <Tabs tabBarExtraContent={operations()} onTabClick={onTabClick}>
          <TabPane tab="智能家居" key="1">
            <div className="controls-box">
              <ul>
                {controlslist?.map(item => (
                  <li key={item.id} className="controls-list">
                    <ControlsList
                      data={item}
                      iconList={controlsIconList}
                      updateCurState={updateCurState}
                      updateSwitchState={updateSwitchState}
                    />
                  </li>
                ))}
              </ul>
              <div className="chart-box">
                <div className="chart-component">
                  <ChartLineComponent
                    title="温度"
                    xAxis={formatTempStatus.xAxis}
                    data={formatTempStatus.temp}
                  />
                </div>
                <div className="chart-component">
                  <ChartLineComponent
                    title="湿度"
                    xAxis={formatTempStatus.xAxis}
                    data={formatTempStatus.hum}
                  />
                </div>
              </div>
            </div>
          </TabPane>
          <TabPane tab="智能安防" key="2">
            <AccessList
              lockData={lockData}
              data={accesslist}
              updateSwitchState={updateSwitchState}
            />
          </TabPane>
          <TabPane tab="历史数据" key="3">
            <ChartViewList />
          </TabPane>
        </Tabs>
      </div>
    </div>
  )
}

export default FamilyContent
