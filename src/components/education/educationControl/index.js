import React, { useState } from 'react'
import './index.scss'
import { message } from 'antd'
import IconFont from '../../common/IconFont/index'
import axios from 'axios'
import { getDeleteUrl, getUserToken } from '../../../api/api'

const EducationControl = props => {
  axios.defaults.headers.common['Authorization'] = getUserToken()
  const [visible, setVisible] = useState(false)

  const handleDelete = data => {
    if (data.cardId !== '-- --') {
      axios.post(getDeleteUrl(), {
        type: 3,
        cardId: data.cardId,
      })
    } else {
      message.error(`请先进行信息登记`);
    }
  }

  return (
    <div className="education-control-wrap">
      <ul className="education-control">
        <li>
          <IconFont style={{ fontSize: '32px' }} type="icon-shuji" />
          <span>编号：{props.data.cardId}</span>
        </li>
        <li>
          <IconFont style={{ fontSize: '32px' }} type="icon-shuji" />
          <span>课程名：{props.data.courseName}</span>
        </li>
        <li>
          <IconFont style={{ fontSize: '32px' }} type="icon-shizhong" />
          <span>开始时间：{props.data.startTime}</span>
        </li>
        <li>
          <IconFont style={{ fontSize: '32px' }} type="icon-shizhong" />
          <span>结束时间：{props.data.startTime}</span>
        </li>
        <li>
          <span className="img-box">
            <IconFont style={{ fontSize: '32px' }} type="icon-yonghu" />
          </span>
          <span>学生人数：{props.data.studentCount}</span>
        </li>
      </ul>
    </div>
  )
}

export default EducationControl
