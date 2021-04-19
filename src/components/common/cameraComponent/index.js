import React, { useRef, useEffect } from 'react'
import './index.scss'
import flvjs from 'flv.js'
import { getCameraUrl } from '../../../api/api'

const CameraComponent = () => {
  const multiVideo = useRef()
  useEffect(() => {
    let flvPlayer
    if (multiVideo.current) {
      flvPlayer = flvjs.createPlayer({
        type: 'flv',
        isLive: true,
        lazyLoad: false,
        autoCleanupSourceBuffer: true,
        url: getCameraUrl,
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
  }, [])

  return (
    <div className="camera-component">
      <div className="camera-box">
        <video muted ref={multiVideo}></video>
      </div>
    </div>
  )
}

export default CameraComponent
