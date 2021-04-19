import { useState, useEffect } from 'react'
import { PahoMQTT } from '../assets/js/mqtt'
import { getMqttConfig } from '../api/api'

function useMqtt() {
  const [data, setData] = useState({})
  const client = new PahoMQTT.Client(
    getMqttConfig.ip,
    getMqttConfig.port,
    getMqttConfig.clientId
  )

  useEffect(() => {
    client.onConnectionLost = responseObject => {
      if (responseObject.errorCode !== 0) {
        console.log('onConnectionLost:' + responseObject.errorMessage)
      }
    }
    client.onMessageArrived = message => {
      setData(JSON.parse(message.payloadString))
    }
    client.connect({
      onSuccess: () => {
        client.subscribe('device_data')
        client.subscribe('card_data')
        const message = new PahoMQTT.Message('Hello')
        message.destinationName = 'World'
        client.send(message)
      },
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return data
}

export default useMqtt
