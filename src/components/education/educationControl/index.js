import React, { useState } from 'react'
import './index.scss'
import { Modal } from 'antd'

import on from '../../../assets/images/on.png'

const EducationControl = () => {
  const [isModalVisible, setIsModalVisible] = useState(false)

  const showModal = () => {
    setIsModalVisible(true)
  }

  const handleOk = () => {
    setIsModalVisible(false)
  }

  const handleCancel = () => {
    setIsModalVisible(false)
  }

  return (
    <div className="education-control">
      <ul className="view-box">
        <li>
          <span className="img-box">
            <img src={on} alt="view-cover" />
          </span>
          <span>待登录</span>
        </li>
        <li>
          <span className="img-box">
            <img src={on} alt="view-cover" />
          </span>
          <span>待登录</span>
        </li>
        <li>
          <span className="img-box">
            <img src={on} alt="view-cover" />
          </span>
          <span>待登录</span>
          <span>-- -- -- --</span>
          <span className="edit" onClick={showModal}>
            <img src={on} alt="view-cover" />
          </span>
        </li>
        <li>
          <span className="img-box">
            <img src={on} alt="view-cover" />
          </span>
          <span>待登录</span>
        </li>
      </ul>
      <div className="bottom-box">
        <div className="music-box">
          <h4>音乐</h4>
          <div className="music-control">
            <span>播放</span>
            <span>暂停</span>
            <span>上一首</span>
            <span>下一首</span>
          </div>
        </div>
        <div className="temperature-box">
          <div>
            <div>
              <img src={on} alt="temperature-cover" />
              <span>23 度</span>
            </div>
            <div>
              <img src={on} alt="temperature-cover" />
              <span>66 度</span>
            </div>
          </div>
          <div>
            <img src={on} alt="temperature-cover" />
            <p>600</p>
            <p>Lux</p>
          </div>
        </div>
      </div>
      <Modal
        title="Basic Modal"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Modal>
    </div>
  )
}

export default EducationControl
