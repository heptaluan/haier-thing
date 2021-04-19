import React, { useState } from 'react'
import './index.scss'
import { Button, Modal, Form, Input } from 'antd'

const CollectionCreateForm = ({ visible, onCreate, onCancel }) => {
  const [form] = Form.useForm()
  return (
    <Modal
      visible={visible}
      title="数据连接参数设置"
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

          })
      }}
    >
      <Form form={form} name="basic" initialValues={{ remember: true }}>
        <Form.Item
          label="数据服务地址"
          name="address"
          rules={[{ required: true, message: '请输入数据服务地址' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="数据服务端口"
          name="port"
          rules={[{ required: true, message: '请输入数据服务端口' }]}
        >
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  )
}

const ConnectSetting = () => {
  const [visible, setVisible] = useState(false)

  const onCreate = values => {
    setVisible(false)
  }

  return (
    <>
      <Button
        type="text"
        onClick={() => {
          setVisible(true)
        }}
      >
        连接设置
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

export default ConnectSetting
