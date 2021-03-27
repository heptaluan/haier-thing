import React from 'react'
import './index.scss'
import ConnectSetting from '../connectSetting/index'
import MonitorSetting from '../monitorSetting/index'

const HomeTopHeader = () => {
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
            console.log('Validate Failed:', info)
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

export default HomeTopHeader
