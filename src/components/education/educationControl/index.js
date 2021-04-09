import React, { useState } from 'react'
import './index.scss'
import { Modal, Form, Input, message } from 'antd'
import IconFont from '../../common/IconFont/index'
import axios from 'axios'
import { getRegisterUrl, getDeleteUrl, getUserToken } from '../../../api/api'

const CollectionCreateForm = ({ visible, onCreate, onCancel, data }) => {
  const [form] = Form.useForm()
  return (
    <Modal
      visible={visible}
      title="信息录入"
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
        <Form.Item
          label="课程名称"
          name="courseName"
          rules={[{ required: true, message: '请输入课程名称' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="开始时间"
          name="startTime"
          rules={[{ required: true, message: '请输入课程时间' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="结束时间"
          name="endTime"
          rules={[{ required: true, message: '请输入课程时间' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="教师姓名"
          name="name"
          rules={[{ required: true, message: '请输入教师姓名' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="学生人数"
          name="studentCount"
          rules={[{ required: true, message: '请输入学生人数' }]}
        >
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  )
}

const EducationControl = props => {
  axios.defaults.headers.common['Authorization'] = getUserToken()
  const [visible, setVisible] = useState(false)

  const onCreate = values => {
    console.log(values)
    const data = { ...values, cardId: props.data.cardId }
    axios.post(getRegisterUrl(), {
      type: 2,
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
          <IconFont style={{ fontSize: '32px' }} type="icon-yonghuxinxi" />
          <span>教师姓名：{props.data.name}</span>
          <span className="edit" onClick={() => handleRegister(props.data)}>
            课程录入
          </span>
          <span className="edit" onClick={() => handleDelete(props.data)}>
            课程删除
          </span>
        </li>
        <li>
          <span className="img-box">
            <IconFont style={{ fontSize: '32px' }} type="icon-yonghu" />
          </span>
          <span>学生人数：{props.data.studentCount}</span>
        </li>
      </ul>
      <CollectionCreateForm
        visible={visible}
        onCreate={onCreate}
        data={props.data}
        onCancel={() => {
          setVisible(false)
        }}
      />
    </div>
  )
}

export default EducationControl
