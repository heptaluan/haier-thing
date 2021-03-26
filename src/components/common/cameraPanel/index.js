import React, { useRef, useState, useEffect } from 'react'
import EZUIKit from 'ezuikit-js'

export const CameraPanel = ({ options = {}, data, width, height }) => {
  const [show, setShow] = useState(1)
  const container = useRef(null)
  const video = useRef(null)
  const video1 = useRef(null)
  let render = 0
  const initPlayer = () => {
    render = 1
    new EZUIKit.EZUIKitPlayer({
      id: 'video-container', // 视频容器ID
      accessToken:
        options.text ||
        'ra.d0kg1wz7c9txhdjadykc1gfpcv1zaqn4-54w60n3hkt-1sf8sfg-qxpihbjkv',
      url: options.url || 'ezopen://open.ys7.com/203751922/1.live',
      template: 'simple', // simple - 极简版;standard-标准版;security - 安防版(预览回放);voice-语音版；
      // 视频上方头部控件
      // header: ['capturePicture','save','zoom'],            // 如果templete参数不为simple,该字段将被覆盖
      // // 视频下方底部控件
      // footer: ['talk','broadcast','hd','fullScreen'],      // 如果template参数不为simple,该字段将被覆盖
      audio: 1, // 是否默认开启声音 0 - 关闭 1 - 开启
      // openSoundCallBack: (data) => console.log("开启声音回调",data),
      // closeSoundCallBack: (data) => console.log("关闭声音回调",data),
      // startSaveCallBack: (data) => console.log("开始录像回调",data),
      // stopSaveCallBack: (data) => console.log("录像回调",data),
      // capturePictureCallBack: (data) => console.log("截图成功回调",data),
      // fullScreenCallBack: (data) => console.log("全屏回调",data),
      // getOSDTimeCallBack: (data) => console.log("获取OSDTime回调",data),
      width: width,
      height: height,
    })
    new EZUIKit.EZUIKitPlayer({
      id: 'video-container-1', // 视频容器ID
      accessToken:
        options.text ||
        'ra.d0kg1wz7c9txhdjadykc1gfpcv1zaqn4-54w60n3hkt-1sf8sfg-qxpihbjkv',
      url: options.urlS || 'ezopen://open.ys7.com/203751922/1.live',
      template: 'simple', // simple - 极简版;standard-标准版;security - 安防版(预览回放);voice-语音版；
      // 视频上方头部控件
      // header: ['capturePicture','save','zoom'],            // 如果templete参数不为simple,该字段将被覆盖
      // // 视频下方底部控件
      // footer: ['talk','broadcast','hd','fullScreen'],      // 如果template参数不为simple,该字段将被覆盖
      audio: 1, // 是否默认开启声音 0 - 关闭 1 - 开启
      // openSoundCallBack: (data) => console.log("开启声音回调",data),
      // closeSoundCallBack: (data) => console.log("关闭声音回调",data),
      // startSaveCallBack: (data) => console.log("开始录像回调",data),
      // stopSaveCallBack: (data) => console.log("录像回调",data),
      // capturePictureCallBack: (data) => console.log("截图成功回调",data),
      // fullScreenCallBack: (data) => console.log("全屏回调",data),
      // getOSDTimeCallBack: (data) => console.log("获取OSDTime回调",data),
      width: width,
      height: height,
    })
  }
  //
  useEffect(() => {
    if (container.current && !render) {
      video.current.innerHTML = '';
      video1.current.innerHTML = '';
      initPlayer()
    }
  }, [container.current, video.current, video1.current])
  return (
    <div ref={container} className="video">
      <div className="video-toolbar">
        <button
          onClick={() => {
            setShow(1)
          }}
          className={`video-button ${1 === show ? 'active' : ''}`}
        >
          1
        </button>
        <button
          onClick={() => {
            setShow(2)
          }}
          className={`video-button ${2 === show ? 'active' : ''}`}
        >
          2
        </button>
      </div>
      <div
        ref={video}
        id="video-container"
        className={`${1 === show ? 'active' : ''}`}
        style={{ width: '100%', height: '100%' }}
      ></div>
      <div
        ref={video1}
        id="video-container-1"
        className={`video-container ${2 === show ? 'active' : ''}`}
        style={{ width: '100%', height: '100%' }}
      ></div>
    </div>
  )
}
