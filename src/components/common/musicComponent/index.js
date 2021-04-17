import React, { useState, useEffect } from 'react'
import './index.scss'
import { Button } from 'antd'
import IconFont from '../IconFont/index'
import axios from 'axios'
import { getDevicesListUrl, getDevicesControllerUrl, getUserToken } from '../../../api/api'

const MusicComponent = props => {
  axios.defaults.headers.common['Authorization'] = getUserToken()
  const [data, setData] = useState([])

  const getSceneOneList = () => {
    return axios.post(getDevicesListUrl(), {
      sceneId: props.sceneId,
      groupId: props.groupId,
      page: 1,
      size: 20,
    })
  }

  useEffect(() => {
    const fetchData = async () => {
      const result = await getSceneOneList()
      if (result.data.code === '10000') {
        setData(result.data.result.records[0])
      }
    }
    fetchData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // 数据更新
  const postDevicesController = (deviceId, operationId) => {
    return axios.post(getDevicesControllerUrl(), {
      sceneId: props.sceneId,
      groupId: props.groupId,
      deviceId: deviceId,
      operationId: operationId,
    })
  }

  const handleChangeMusic = type => {
    if (data) {
      switch (type) {
        case 'play':
          postDevicesController(data.id, data.operations.find(item => item.operation_type === 1).id)
          break
        case 'stop':
          postDevicesController(data.id, data.operations.find(item => item.operation_type === 2).id)
          break
        case 'prev':
          postDevicesController(data.id, data.operations.find(item => item.operation_type === 4).id)
          break
        case 'next':
          postDevicesController(data.id, data.operations.find(item => item.operation_type === 3).id)
          break
        default:
          break
      }
    }
  }

  return (
    <div className="music-box-wrap">
      <div className="music-box">
        <Button onClick={() => handleChangeMusic('prev')}>
          <IconFont
            style={{ fontSize: '24px' }}
            type="icon-bofangqishangyishou"
          />
        </Button>
        {/* <Button onClick={() => handleChangeMusic()}>
          <IconFont style={{ fontSize: '24px' }} type="icon-jiahao" />
        </Button> */}
        <Button onClick={() => handleChangeMusic('play')}>
          <IconFont style={{ fontSize: '24px' }} type="icon-bofangqi-bofang" />
        </Button>
        <Button onClick={() => handleChangeMusic('stop')}>
          <IconFont style={{ fontSize: '24px' }} type="icon-bofangqi-zanting" />
        </Button>
        {/* <Button onClick={() => handleChangeMusic()}>
          <IconFont style={{ fontSize: '24px' }} type="icon-jianhao" />
        </Button> */}
        <Button onClick={() => handleChangeMusic('next')}>
          <IconFont
            style={{ fontSize: '24px' }}
            type="icon-bofangqixiayishou"
          />
        </Button>
      </div>
    </div>
  )
}

export default MusicComponent
