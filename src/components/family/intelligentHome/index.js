import React, { useState } from 'react'
import ControlComponent from '../controlComponent/index'
import ChartComponent from '../chartComponent/index'
import WarningComponent from '../warningComponent/index'
import IconFont from '../../common/IconFont/index'
import './index.scss'
// import useMqtt from '../../../hook/useMqtt'
// import mqtt from 'mqtt'

const IntelligentHome = () => {
  // const client = mqtt.connect('192.168.1.198:1883')

  // client.on('connect', function () {
  //   client.subscribe('cowsay', function (err) {
  //     if (!err) {
  //       client.publish('cowsay', 'Hello mqtt')
  //     }
  //   })
  // })

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

  // 温度计 && 光照
  const temperatureStatus = {
    temperature: 123,
    humidity: 456,
    illumination: 789,
    chartData: {
      xAxis: ['一', '二', '三', '四', '五', '六', '七', '八', '九'],
      temperature: [1, 3, 9, 27, 81, 247, 741, 2223, 6669],
      humidity: [1, 2, 4, 8, 16, 32, 64, 128, 256],
      illumination: [1, 24, 24, 28, 162, 322, 642, 2, 15],
    },
  }

  return (
    <div className="intelligent-home-wrap">
      <div className="intelligent-home">
        <div className="chart-component-box">
          <ChartComponent data={temperatureStatus} />
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
