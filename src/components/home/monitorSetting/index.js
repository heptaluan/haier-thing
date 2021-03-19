import React, { useState } from 'react'
import './index.scss'
import { Button, Modal, Form, Input } from 'antd'

const CollectionCreateForm = ({ visible, onCreate, onCancel }) => {
  const [form] = Form.useForm()
  return (
    <Modal
      visible={visible}
      title="监控参数设置"
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
          label="监控地址"
          name="address"
          rules={[{ required: true, message: '请输入监控地址' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="监控端口"
          name="port"
          rules={[{ required: true, message: '请输入监控端口' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="监控用户"
          name="user"
          rules={[{ required: true, message: '请输入监控用户' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="监控密码"
          name="password"
          rules={[{ required: true, message: '请输入监控密码' }]}
        >
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  )
}

const MonitorSetting = () => {
  const [visible, setVisible] = useState(false)

  const onCreate = values => {
    console.log('Received values of form: ', values)
    setVisible(false)
  }

  return (
    <>
      <Button
        type="primary"
        onClick={() => {
          setVisible(true)
        }}
      >
        监控设置
      </Button>
      <CollectionCreateForm
        visible={visible}
        onCreate={onCreate}
        onCancel={() => {
          setVisible(false)
        }}
      />
    </>
  )
}

export default MonitorSetting
