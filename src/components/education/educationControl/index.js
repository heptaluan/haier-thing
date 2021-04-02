import React, { useState } from 'react'
import './index.scss'
import { Modal, Form, Input } from 'antd'
import IconFont from '../../common/IconFont/index'

const CollectionCreateForm = ({ visible, onCreate, onCancel }) => {
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
          name="class"
          rules={[{ required: true, message: '请输入课程名称' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="课程时间"
          name="time"
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
          name="num"
          rules={[{ required: true, message: '请输入学生人数' }]}
        >
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  )
}

const EducationControl = () => {
  const [visible, setVisible] = useState(false)

  const onCreate = values => {
    console.log('Received values of form: ', values)
    setVisible(false)
  }

  return (
    <div className="education-control-wrap">
      <ul className="education-control">
        <li>
          <IconFont style={{ fontSize: '32px' }} type="icon-shuji" />
          <span>待登录</span>
        </li>
        <li>
          <IconFont style={{ fontSize: '32px' }} type="icon-shizhong" />
          <span>待登录</span>
        </li>
        <li>
          <IconFont style={{ fontSize: '32px' }} type="icon-yonghuxinxi" />
          <span>待登录</span>
          <span className="edit-content">-- -- -- --</span>
          <span className="edit" onClick={() => setVisible(true)}>
            <IconFont style={{ fontSize: '22px' }} type="icon-bianji" />
          </span>
        </li>
        <li>
          <span className="img-box">
            <IconFont style={{ fontSize: '32px' }} type="icon-yonghu" />
          </span>
          <span>待登录</span>
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

export default EducationControl
