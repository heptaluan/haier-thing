import React from 'react'
import Router from './router'
import 'antd/dist/antd.css'
import './assets/scss/reset.scss'
import { pushCameraUrl } from './api/api'
import axios from 'axios'

const App = () => {
  axios.get(pushCameraUrl(1))
  return (
    <div className="App">
      <Router />
    </div>
  )
}

export default App
