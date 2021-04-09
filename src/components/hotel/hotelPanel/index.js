import React, { useState } from 'react'
import './index.scss'
import { message, Modal, Form, Input, Button } from 'antd'
import axios from 'axios'
import { getRegisterUrl, getDeleteUrl, getUserToken } from '../../../api/api'

const CollectionCreateForm = ({ visible, onCreate, onCancel, id }) => {
  const [form] = Form.useForm()
  return (
    <Modal
      visible={visible}
      title="信息登记"
      onCancel={onCancel}
      okText="确定"
      cancelText="取消"
      onOk={() => {
        form
          .validateFields()
          .then(values => {
            form.resetFields()
            onCreate(values)
          })
          .catch(info => {
            console.log('Validate Failed:', info)
          })
      }}
    >
      <Form form={form} name="basic" initialValues={{ remember: true }}>
        <Form.Item label="Plain Text">
          <span className="标签编号">{id}</span>
        </Form.Item>
        <Form.Item
          label="身份证号"
          name="identityNumber"
          rules={[{ required: true, message: '请输入身份证号' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="用户姓名"
          name="name"
          rules={[{ required: true, message: '请输入用户姓名' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="房间编号"
          name="roomNumber"
          rules={[{ required: true, message: '请输入房间编号' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="入住天数"
          name="stayCount"
          rules={[{ required: true, message: '请输入入住天数' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="预付金额"
          name="prePaid"
          rules={[{ required: true, message: '请输入预付金额' }]}
        >
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  )
}

const HotelPanel = props => {
  axios.defaults.headers.common['Authorization'] = getUserToken()
  const [visible, setVisible] = useState(false)

  const onCreate = values => {
    console.log(values)
    const data = { ...values, cardId: props.data.cardId }
    axios.post(getRegisterUrl(), {
      type: 3,
      value: {
        ...data
      },
      cardId: props.data.cardId,
    })
    setVisible(false)
  }

  const handleRegister = data => {
    if (data.cardId !== '-- --') {
      setVisible(true)
    } else {
      message.error(`请先进行信息登记`);
    }
  }

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
    <div className="hotel-panel-wrap">
      <div className="hotel-panel-box">
        <div className="hotel-panel">
          <ul>
            <li>
              <span className="title">标签编号：</span>
              <span className="information-content">{props.data.cardId}</span>
            </li>
            <li>
              <span className="title">身份证号：</span>
              <span className="information-content">{props.data.identityNumber}</span>
            </li>
            <li>
              <span className="title">用户姓名：</span>
              <span className="information-content">{props.data.name}</span>
            </li>
            <li>
              <span className="title">入住时间：</span>
              <span className="information-content">{props.data.time}</span>
            </li>
            <li>
              <span className="title">入住天数：</span>
              <span className="information-content">{props.data.stayCount}</span>
            </li>
            <li>
              <span className="title">预付金额：</span>
              <span className="information-content">{props.data.prePaid}</span>
            </li>
            <li>
              <span className="title">房间号：</span>
              <span className="information-content">{props.data.roomNumber}</span>
            </li>
          </ul>
        </div>
        <div className="information-input">
          <h4>信息提示</h4>
          <div className="btn-group">
            <Button onClick={() => handleRegister(props.data)}>信息登记</Button>
            <Button onClick={() => handleDelete(props.data)}>信息注销</Button>
          </div>
        </div>
      </div>
      <CollectionCreateForm
        visible={visible}
        onCreate={onCreate}
        id={props.data.cardId}
        onCancel={() => {
          setVisible(false)
        }}
      />
    </div>
  )
}

export default HotelPanel
