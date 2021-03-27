import React, { useState, useEffect } from 'react'
import ControlComponent from '../controlComponent/index'
import ChartComponent from '../chartComponent/index'
import WarningComponent from '../warningComponent/index'
import IconFont from '../../common/IconFont/index'
import './index.scss'
import useMqtt from '../../../hook/useMqtt'
import axios from 'axios'
import { getDevicesListUrl, getLatestDataUrl } from '../../../api/api'
import { findRecordsValue, formatLatestValue} from '../../../util/index'

const IntelligentHome = () => {
  const [data, setData] = useState({})
  

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

  // console.log(tempStatus)

  // 控制组件
  const controlStatus = [
    {
      id: 1,
      title: '智能灯光',
      state: false,
      on: <IconFont style={{ fontSize: '60px' }} type="icon-dengpao" />,
      off: <IconFont style={{ fontSize: '60px' }} type="icon-dengpao1" />,
      onText: '开启灯光',
      offText: '关闭灯光',
    },
    {
      id: 2,
      title: '智能开关',
      state: true,
      on: <IconFont style={{ fontSize: '60px' }} type="icon-chazuo-" />,
      off: (
        <IconFont
          style={{ fontSize: '60px' }}
          type="icon-hekriconshebeichazuoxianxing"
        />
      ),
      onText: '开关通电',
      offText: '开光断电',
    },
    {
      id: 3,
      title: '智能空调',
      state: false,
      on: <IconFont style={{ fontSize: '60px' }} type="icon-kongtiao1" />,
      off: <IconFont style={{ fontSize: '60px' }} type="icon-kongtiao" />,
      onText: '开启空调',
      offText: '关闭空调',
    },
    {
      id: 4,
      title: '智能窗帘',
      state: true,
      on: <IconFont style={{ fontSize: '60px' }} type="icon-chuanglian" />,
      off: <IconFont style={{ fontSize: '60px' }} type="icon-icon-test1" />,
      onText: '开启窗帘',
      offText: '关闭窗帘',
    },
  ]
  const [states, setState] = useState(controlStatus)

  const updateCurState = (id, updateState) => {
    console.log(updateState)
    setState(states.map(el => (el.id === id ? updateState : el)))
  }

  return (
    <div className="intelligent-home-wrap">
      <div className="intelligent-home">
        <div className="chart-component-box">
          <ChartComponent data={tempStatus} />
        </div>
        <div className="warning-component-box">
          <WarningComponent />
        </div>
        <div className="voice-component-box">
          <h4>语音控制</h4>
          <p>----</p>
          <IconFont
            style={{ fontSize: '100px' }}
            type="icon-lvsefenkaicankaoxianban-"
          />
        </div>
        <div className="control-component-box">
          {states.map(item => (
            <ControlComponent
              key={item.id}
              id={item.id}
              data={item}
              updateState={updateCurState}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default IntelligentHome
