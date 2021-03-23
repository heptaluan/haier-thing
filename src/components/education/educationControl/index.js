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
    <div className="education-control">
      <ul className="view-box">
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
      <div className="bottom-box">
        <div className="view-music-box">
          <h4>音乐</h4>
          <div className="music-control">
            <IconFont style={{ fontSize: '36px' }} type="icon-zanting" />
            <IconFont
              style={{ fontSize: '36px' }}
              type="icon-bofang-shangyige-xiayige"
            />
            <IconFont
              style={{ fontSize: '36px' }}
              type="icon-bofang-xiayige-shangyige"
            />
            <IconFont
              style={{ fontSize: '36px' }}
              type="icon-bofang-tingzhi-zanting"
            />
          </div>
        </div>
        <div className="temperature-box">
          <div className="temperature-view">
            <div>
              <IconFont style={{ fontSize: '36px' }} type="icon-thermometer" />
              <span>23 度</span>
            </div>
            <div>
              <IconFont style={{ fontSize: '36px' }} type="icon-wenshidu-" />
              <span>66 度</span>
            </div>
          </div>
          <div className="illumination-view">
            <IconFont style={{ fontSize: '36px' }} type="icon-icon-test" />
            <span>600</span>
            <span>Lux</span>
          </div>
        </div>
      </div>
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
