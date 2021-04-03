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
        type="text"
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
