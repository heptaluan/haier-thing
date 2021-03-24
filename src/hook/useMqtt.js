import { useEffect, useState } from 'react'
import mqtt from 'mqtt'

const useMqtt = () => {
  const [client, setClient] = useState(null)

  const mqttConnect = (host, mqttOption) => {
    setClient(mqtt.connect(host, mqttOption))
  }

  useEffect(() => {
    if (client) {
      client.on('connect', () => {
        console.log(`connect`)
      })
      client.on('error', err => {
        console.error('Connection error: ', err)
        client.end()
      })
      client.on('reconnect', () => {
        console.log(`reconnect`)
      })
      client.on('message', (topic, message) => {
        const payload = { topic, message: message.toString() }
        console.log(payload)
      })
    }
  }, [client])

  const mqttDisconnect = () => {
    if (client) {
      client.end(() => {
        console.log(`end`)
      })
    }
  }

  const mqttPublish = context => {
    if (client) {
      const { topic, qos, payload } = context
      client.publish(topic, payload, { qos }, error => {
        if (error) {
          console.log('Publish error: ', error)
        }
      })
    }
  }

  const mqttSub = subscription => {
    if (client) {
      const { topic, qos } = subscription
      client.subscribe(topic, { qos }, error => {
        if (error) {
          console.log('Subscribe to topics error', error)
          return
        }
      })
    }
  }

  const mqttUnSub = subscription => {
    if (client) {
      const { topic } = subscription
      client.unsubscribe(topic, error => {
        if (error) {
          console.log('Unsubscribe error', error)
          return
        }
      })
    }
  }

  return {
    mqttConnect,
    mqttDisconnect,
    mqttPublish,
    mqttSub,
    mqttUnSub,
  }
}

export default useMqtt
