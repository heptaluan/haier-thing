import React, { useEffect, useState } from 'react'
import './index.scss'
import { Button, Empty } from 'antd'
import { getUserToken, getGatewayUrl } from '../../../api/api'
import axios from 'axios'

const StepFour = () => {
  axios.defaults.headers.common['Authorization'] = getUserToken()

  const [list, setList] = useState([])

  useEffect(() => {
    getList()
  }, [])

  // 网关列表
  const getList = async () => {
    const result = await axios.get(getGatewayUrl())
    if (result.data.code === '10000') {
      setList(result.data.result.records)
    }
  }

  // 刷新
  const reload = () => {
    getList()
  }

  return (
    <div className="tab-two">
      <div className="btn-groups">
        <Button
          type="primary"
          onClick={() => {
            reload()
          }}
        >
          刷新网关
        </Button>
      </div>
      <div className="table-header">
        <span className="name">网关名称</span>
        <span className="desc">备注</span>
      </div>
      <ul className="user-list">
        {list.length === 0 ? (
          <Empty />
        ) : (
          list?.map(item => (
            <li key={item.id}>
              <span className="name">{item.schoolName}</span>
              <span className="desc">{item.remark}</span>
            </li>
          ))
        )}
      </ul>
    </div>
  )
}

export default StepFour
