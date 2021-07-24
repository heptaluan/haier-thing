import React, { useRef, useEffect, useMemo } from 'react'
import './index.scss'
import flvjs from 'flv.js'

const CameraComponent = () => {
  const multiVideo = useRef()
  
  const cameraUrl = useMemo(() => {
    return localStorage.getItem('cameraUrl')
  }, [])

  useEffect(() => {
    let flvPlayer
    if (multiVideo.current) {
      flvPlayer = flvjs.createPlayer({
        type: 'flv',
        isLive: true,
        lazyLoad: false,
        autoCleanupSourceBuffer: true,
        url: `/live?port=1935&app=myapp&stream=monitor${cameraUrl}`,
      })
      flvPlayer.attachMediaElement(multiVideo.current)
      flvPlayer.load()
      setTimeout(() => {
        flvPlayer.play()
      }, 200)
    }
    return () => {
      flvPlayer.unload()
    }
  }, [cameraUrl])

  return (
    <div className="camera-component">
      <div className="camera-box">
        <video muted ref={multiVideo}></video>
      </div>
    </div>
  )
}

export default CameraComponent
