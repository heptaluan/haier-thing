import React, { useState, useEffect, useContext } from 'react'
import ChartLineComponent from '../../common/chartLineComponent/index'
import IconFont from '../../common/IconFont/index'
import './index.scss'
import axios from 'axios'
import {
  getDevicesListUrl,
  getLatestDataUrl,
  getDevicesControllerUrl,
  getSceneId,
  getUserToken,
} from '../../../api/api'
import { formatLatestValue, formatDate } from '../../../util/index'
import { Tabs, DatePicker, Space, message } from 'antd'
import ControlsList from '../controlsList/index'
import AccessList from '../accessList/index'
import 'moment/locale/zh-cn'
import locale from 'antd/es/date-picker/locale/zh_CN'
import MusicComponent from '../../common/musicComponent/index'
import { UserContext } from '../../../router/index'
import { useHistory } from 'react-router-dom'

const { TabPane } = Tabs

const FamilyContent = () => {
  axios.defaults.headers.common['Authorization'] = getUserToken()
  const [allList, setAllList] = useState([])
  const [controlslist, setControlslist] = useState([])
  const [accesslist, setAccessList] = useState([])
  const history = useHistory()

  // 日期选择事件
  const handleDateChange = (date, dateString) => {
    // 请求数据
    getChartLatestData(allList, dateString)
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
  const getAllSceneList = () => {
    return axios.post(getDevicesListUrl(), {
      sceneId: getSceneId().family,
      groupId: null,
      page: 1,
      size: 20,
    })
  }

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

  useEffect(() => {
    const fetchData = async () => {
      const result = await getAllSceneList()
      if (result.data.code === '10000') {
        setAllList(result.data.result.records)
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
      }
    }
    fetchData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

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
      }
    }
    fetchData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleSwitchChange = async (
    groupId,
    deviceId,
    operationId,
    param = {},
    checked
  ) => {
    const result = await postDevicesController(
      getSceneId().family,
      groupId,
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

  const updateSwitchState = (checked, data, id) => {
    switch (data.classId) {
      case 10:
        if (checked) {
          handleSwitchChange(
            id,
            data.id,
            data.operations.find(item => item.operation_type === 1).id,
            {},
            checked
          )
        } else {
          handleSwitchChange(
            id,
            data.id,
            data.operations.find(item => item.operation_type === 0).id,
            {},
            checked
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
            },
            checked
          )
        } else {
          handleSwitchChange(
            id,
            data.id,
            data.operations.find(item => item.operation_type === 7).id,
            {
              value: 0,
              jointDeviceId: controlslist.find(item => item.classId === 10).id,
            },
            checked
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

  const updateCurState = (deviceId, operationId, checked) => {
    const fetchData = async () => {
      const result = await postDevicesController(
        getSceneId().family,
        1,
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
  if (mqttData.deviceId) {
    controlslist.map(item => {
      switch (item.classId) {
        case 3:
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
        case 10:
          if (item.id === mqttData.deviceId) {
            return (item.latestData = {
              value: JSON.stringify({
                value: mqttData.value && mqttData.value.value,
              }),
            })
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
                value: mqttData.value && mqttData.value.value,
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

  const userData = {
    cardId: '-- --',
    show: false,
    state: false
  }

  // eslint-disable-next-line no-unused-vars
  const [lockData, setLockData] = useState(userData)

  if (mqttData.cardId && !mqttData.id) {
    lockData.cardId = mqttData.cardId
    lockData.show = true
  } else if (mqttData.cardId && mqttData.id) {
    lockData.cardId = mqttData.cardId
    lockData.show = true
    lockData.state = true
  }

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
                {chartLatestData
                  .filter(item => item.id === 16 || item.id === 15)
                  .map(item => (
                    <div key={item.id} className="chart-component">
                      <ChartLineComponent
                        type={item.type}
                        title={item.title}
                        x={item.x}
                        y={item.y}
                      />
                    </div>
                  ))}
              </div>
            </div>
          </TabPane>
          <TabPane tab="智能安防" key="2">
            <AccessList
              lockData={lockData}
              data={accesslist}
              setLockData={setLockData}
              updateSwitchState={updateSwitchState}
            />
          </TabPane>
          <TabPane tab="历史数据" key="3">
            <div className="chart-list-box">
              {chartLatestData
                .filter(
                  item =>
                    item.id === 16 ||
                    item.id === 15 ||
                    item.id === 14 ||
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
    </div>
  )
}

export default FamilyContent
