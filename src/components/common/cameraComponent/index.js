import React, { useRef } from 'react'
import './index.scss'
import flvjs from 'flv.js'

const CameraComponent = () => {
  const multiVideo = useRef()
  if (multiVideo.current) {
    const flvPlayer = flvjs.createPlayer({
      type: 'flv',
      isLive: true,
      lazyLoad: false,
      autoCleanupSourceBuffer: true,
      url: 'http://192.168.1.129/live?port=1935&app=myapp&stream=monitor1',
    })
    flvPlayer.attachMediaElement(multiVideo.current)
    flvPlayer.load()
    setTimeout(() => {
      flvPlayer.play()
    }, 200)
  }

  return (
    <div className="camera-component">
      <div className="camera-box">
        <video muted ref={multiVideo}></video>
      </div>
    </div>
  )
}

export default CameraComponent
