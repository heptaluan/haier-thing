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

const ConnectSetting = () => {
  const [visible, setVisible] = useState(false)

  const onCreate = values => {
    console.log('Received values of form: ', values)
    setVisible(false)
  }

  return (
    <div className="intelligent-home-wrap">
      <div className="intelligent-home">
        <div className="chart-component-box">
          <ChartComponent data={tempStatus} />
        </div>
        <div className="warning-component-box">
          <WarningComponent />
        </div>
        <div className="voice-component-box">
          <h4>语音控制</h4>
          <p>----</p>
          <IconFont
            style={{ fontSize: '100px' }}
            type="icon-lvsefenkaicankaoxianban-"
          />
        </div>
        <div className="control-component-box">
          {states.map(item => (
            <ControlComponent
              key={item.id}
              id={item.id}
              data={item}
              updateState={updateCurState}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default ConnectSetting
