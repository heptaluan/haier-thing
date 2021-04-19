import React, { useState } from 'react'
import './index.scss'
import { message, Modal, Form, Input, Button } from 'antd'
import axios from 'axios'
import { getRegisterUrl, getDeleteUrl, getUserToken, getSceneId } from '../../../api/api'

const CollectionCreateForm = ({ visible, onCreate, onCancel }) => {
  const [form] = Form.useForm()
  const handlePreinstall = () => {
    form.setFieldsValue({
      identityNumber: '420105200001014992',
      name: '张三',
      roomNumber: 'A104',
      stayCount: '3',
      prePaid: '200'
    })
  }
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
        <Button size="small" type="primary" className="preinstall" onClick={() => handlePreinstall()}>预设</Button>
        <Form.Item
          label="身份证号"
          name="identityNumber"
          rules={[
            {
              required: true,
              pattern: new RegExp(
                /^[1-9]\d{5}(18|19|20)\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/,
                'g'
              ),
              message: '请输入正确的身份证号',
            },
          ]}
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
          rules={[
            {
              required: true,
              pattern: new RegExp(/^[1-9]\d*$/, 'g'),
              message: '请输入入住天数',
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="预付金额"
          name="prePaid"
          rules={[
            {
              required: true,
              pattern: new RegExp(/^[1-9]\d*$/, 'g'),
              message: '请输入预付金额',
            },
          ]}
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
    const data = { ...values, cardId: props.data.cardId }
    axios.post(getRegisterUrl(), {
      type: getSceneId().hotel,
      value: {
        ...data,
      },
      cardId: props.data.cardId,
    }).then(res => {
      if (res.data.code === '10000') {
        message.success(`信息录入成功`)
        setVisible(false)
      } else if (res.data.code === '20000') {
        message.success(`卡片已经注册`)
      }
    })
  }

  const handleRegister = data => {
    if (data.cardId !== '-- --') {
    setVisible(true)
    } else {
      message.error(`请先进行信息登记`)
    }
  }

  const handleDelete = data => {
    if (data.cardId !== '-- --') {
      axios.post(getDeleteUrl(), {
        type: getSceneId().hotel,
        cardId: data.cardId,
      }).then(res => {
        if (res.data.code === '10000') {
          message.success(`信息注销成功`)
          props.setData({
            cardId: '-- --',
            identityNumber: '-- --',
            name: '-- --',
            time: '-- --',
            stayCount: '-- --',
            prePaid: '-- --',
            roomNumber: '-- --',
          })
          setVisible(false)
        } else if (res.data.code === '20000') {
          message.success(`信息注销失败，请重新尝试`)
        }
      })
    } else {
      message.error(`请先进行信息登记`)
    }
  }

  return (
    <div className="hotel-panel-wrap">
      <div className="btn-group">
        <Button onClick={() => handleRegister(props.data)}>信息登记</Button>
        <Button onClick={() => handleDelete(props.data)}>信息注销</Button>
      </div>
      <ul>
        <li>
          <span className="title">卡片编号：</span>
          <span className="information-content">{props.data.cardId}</span>
        </li>
        <li>
          <span className="title">身份证号：</span>
          <span className="information-content">
            {props.data.identityNumber}
          </span>
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
          <span className="title">房间号码：</span>
          <span className="information-content">{props.data.roomNumber}</span>
        </li>
      </ul>
      <CollectionCreateForm
        visible={visible}
        onCreate={onCreate}
        onCancel={() => {
          setVisible(false)
        }}
      />
    </div>
  )
}

export default HotelPanel
