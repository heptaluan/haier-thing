import React from 'react'
import './index.scss'

const ParkList = () => {
  const [form] = Form.useForm()

  // switch 事件
  const onChange = checked => {
    props.updateCurState(props.data.id, checked)
  }

  const handleChangeWarnState = props => {
    if (props.data.id === 4) {
      props.updateCurState(props.data.id, !props.data.state)
    }
  }

  return (
    <Modal
      visible={visible}
      title="数据连接参数设置"
      onCancel={onCancel}
      okText="确定"
      cancelText="取消"
      onChange={onChange}
      handleChangeWarnState={handleChangeWarnState}
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
          <div>
            <Input />
          </div>
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default ParkList
