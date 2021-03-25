import { useState, useEffect } from 'react'
import mqtt from 'mqtt'

function useMqtt() {
  const [data, setData] = useState({})

  const options = {
    clientId: 'mqttjs_' + Math.random().toString(16).substr(2, 8),
    username: 'admin',
    password: 'admin',
  }

  const connectUrl = `ws://192.168.1.198:8083/mqtt`
  const client = mqtt.connect(connectUrl, options)

  useEffect(() => {
    client.on('error', error => {
      console.log('连接失败:', error)
    })

    client.on('connect', function () {
      client.subscribe('device_data', function (err) {
        if (!err) {
          client.publish('presence', 'Hello mqtt')
        }
      })
    })

    client.on('message', (topic, message) => {
      setData(JSON.parse(message.toString()))
    })
    // 只需要执行一次，所以不需要添加 client 依赖
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return data
}

export default useMqtt
