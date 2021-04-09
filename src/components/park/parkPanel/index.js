import React from 'react'
import './index.scss'
import IconFont from '../../common/IconFont/index'
import { Button, message } from 'antd'
import axios from 'axios'
import { getRegisterUrl, getDeleteUrl, getUserToken } from '../../../api/api'

axios.defaults.headers.common['Authorization'] = getUserToken()

const ParkPanel = props => {

  const handleRegister = data => {
    if (data.cardId !== '-- --') {
      axios.post(getRegisterUrl(), {
        type: 4,
        value: {
          cardId: data.cardId
        },
        cardId: data.cardId,
      })
    } else {
      message.error(`请先进行信息登记`);
    }
  }

  const handleDelete = data => {
    if (data.cardId !== '-- --') {
      axios.post(getDeleteUrl(), {
        type: 4,
        cardId: data.cardId,
      })
    } else {
      message.error(`请先进行信息登记`);
    }
  }

  return (
    <div className="park-panel-wrap">
      <div className="park-panel-box">
        <div className="park-panel">
          <ul>
            <li>
              <span className="title">标签编号：</span>
              <span className="information-content">{props.data.cardId}</span>
            </li>
            <li>
              <span className="title">车牌信息：</span>
              <span className="information-content">{props.data.carPlate}</span>
            </li>
            <li>
              <span className="title">入场时间：</span>
              <span className="information-content">
                {props.data.startTime}
              </span>
            </li>
            <li>
              <span className="title">出场时间：</span>
              <span className="information-content">{props.data.endTime}</span>
            </li>
            <li>
              <span className="title">扣费信息：</span>
              <span className="information-content">{props.data.parkingCost}</span>
            </li>
          </ul>
        </div>
        <div className="information-input">
          <h4>信息提示</h4>
          <div className="btn-group">
            <Button onClick={() => handleRegister(props.data)}>录入</Button>
            <Button onClick={() => handleDelete(props.data)}>删除</Button>
          </div>
        </div>
      </div>
      <div className="information-cover">
        <IconFont style={{ fontSize: '80px' }} type="icon-zidonglanganji" />
      </div>
    </div>
  )
}

export default ParkPanel
