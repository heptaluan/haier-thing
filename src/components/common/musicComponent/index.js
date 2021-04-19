import React, { useState, useEffect } from 'react'
import './index.scss'
import IconFont from '../IconFont/index'
import axios from 'axios'
import {
  getDevicesListUrl,
  getDevicesControllerUrl,
  getUserToken,
} from '../../../api/api'

const MusicComponent = props => {
  axios.defaults.headers.common['Authorization'] = getUserToken()
  const [data, setData] = useState([])
  const [state, setState] = useState(true)
  const [val, setVal] = useState(0)

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
        const data = result.data.result.records[0]
        setData(data)
        setVal(5)
        postDevicesController(
          data.id,
          data.operations.find(item => item.operation_type === 6).id,
          { value: 5 }
        )
      }
    }
    fetchData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // 数据更新
  const postDevicesController = (deviceId, operationId, param = {}) => {
    return axios.post(getDevicesControllerUrl(), {
      sceneId: props.sceneId,
      groupId: props.groupId,
      deviceId: deviceId,
      operationId: operationId,
      param: param,
    })
  }

  const handleChangeMusic = type => {
    if (data.length !== 0) {
      switch (type) {
        case 'play':
          setState(false)
          postDevicesController(
            data.id,
            data.operations.find(item => item.operation_type === 1).id
          )
          break
        case 'stop':
          setState(true)
          postDevicesController(
            data.id,
            data.operations.find(item => item.operation_type === 2).id
          )
          break
        case 'prev':
          postDevicesController(
            data.id,
            data.operations.find(item => item.operation_type === 4).id
          )
          break
        case 'next':
          postDevicesController(
            data.id,
            data.operations.find(item => item.operation_type === 3).id
          )
          break
        case 'add':
          let add = val
          add++
          if (add > 9) {
            add = 10
          }
          setVal(add)
          postDevicesController(
            data.id,
            data.operations.find(item => item.operation_type === 6).id,
            { value: add }
          )
          break
        case 'dec':
          let dec = val
          dec--
          if (dec < 1) {
            add = 0
          }
          setVal(dec)
          postDevicesController(
            data.id,
            data.operations.find(item => item.operation_type === 6).id,
            { value: dec }
          )
          break
        default:
          break
      }
    }
  }

  return (
    <>
      <div className="music-btn-wrap-top">
        <div
          className="music-btn-box"
          onClick={() => handleChangeMusic('prev')}
        >
          <div className="music-btn">
            <IconFont style={{ fontSize: '30px' }} type="icon-shangyishou" />
          </div>
        </div>
        <div className="music-btn-box">
          {state ? (
            <div
              className="music-btn"
              onClick={() => handleChangeMusic('play')}
            >
              <IconFont style={{ fontSize: '50px' }} type="icon-bofang3" />
            </div>
          ) : (
            <div
              className="music-btn"
              onClick={() => handleChangeMusic('stop')}
            >
              <IconFont style={{ fontSize: '50px' }} type="icon-zanting" />
            </div>
          )}
        </div>
        <div
          className="music-btn-box"
          onClick={() => handleChangeMusic('next')}
        >
          <div className="music-btn">
            <IconFont style={{ fontSize: '30px' }} type="icon-xiayishou" />
          </div>
        </div>
      </div>
      <div className="music-btn-wrap-bottom">
        <div className="music-btn-box" onClick={() => handleChangeMusic('add')}>
          <div className="music-btn">
            <IconFont style={{ fontSize: '30px' }} type="icon-jiahao1" />
          </div>
        </div>
        <div className="music-btn-box" onClick={() => handleChangeMusic('dec')}>
          <div className="music-btn">
            <IconFont style={{ fontSize: '30px' }} type="icon-minus-circle" />
          </div>
        </div>
      </div>
    </>
  )
}

export default MusicComponent
