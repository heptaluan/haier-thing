import React, { useState } from 'react'
import './index.scss'
import IconFont from '../../common/IconFont/index'
import { Button, message, Modal, Form, Input } from 'antd'
import axios from 'axios'
import { getRegisterUrl, getDeleteUrl, getUserToken, getSceneId } from '../../../api/api'

axios.defaults.headers.common['Authorization'] = getUserToken()

const CollectionCreateForm = ({ visible, onCreate, onCancel, id }) => {
  const [form] = Form.useForm()
  const handlePreinstall = () => {
    form.setFieldsValue({
      carPlate: '鄂A 83344'
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
          label="车牌号"
          name="carPlate"
          rules={[{ required: true, message: '请输入车牌号' }]}
        >
          <Input defaultValue={''}/>
        </Form.Item>
      </Form>
    </Modal>
  )
}

const ParkPanel = props => {
  const [visible, setVisible] = useState(false)

  const onCreate = values => {
    axios.post(getRegisterUrl(), {
      type: getSceneId().park,
      value: {
        cardId: props.data.cardId,
        carPlate: values.carPlate
      },
      cardId: props.data.cardId,
    }).then(res => {
      if (res.data.code === '10000') {
        message.success(`信息录入成功`)
        setVisible(false)
      } else if (res.data.code === '20000') {
        message.success(`信息录入失败，请重新尝试`)
      }
    })
  }

  const handleOpen = data => {
    props.updateCurState(true, data)
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
        type: getSceneId().park,
        cardId: data.cardId,
      }).then(res => {
        if (res.data.code === '10000') {
          message.success(`信息删除成功`)
          props.setData({
            cardId: '-- --',
            carPlate: '-- --',
            startTime: '-- --',
            endTime: '-- --',
            prePaid: '-- --',
          })
          setVisible(false)
        } else if (res.data.code === '20000') {
          message.success(`信息删除失败，请重新尝试`)
        }
      })
    } else {
      message.error(`请先进行信息登记`);
    }
  }

  return (
    <div className="park-panel-wrap">
      <div className="btn-group">
        <Button onClick={() => handleRegister(props.data)}>信息录入</Button>
        <Button onClick={() => handleDelete(props.data)}>信息删除</Button>
      </div>
      <div className="park-panel-box">
        <ul>
            <li>
              <span className="title">卡片编号：</span>
              <span className="information-content">{props.data.cardId}</span>
            </li>
            <li>
              <span className="title">车牌信息：</span>
              <span className="information-content">{props.data.carPlate}</span>
            </li>
            <li>
              <span className="title">入场时间：</span>
              <span className="information-content">
                {props.data.startTime}
              </span>
            </li>
            <li>
              <span className="title">出场时间：</span>
              <span className="information-content">{props.data.endTime}</span>
            </li>
            <li>
              <span className="title">扣费信息：</span>
              <span className="information-content">{props.data.parkingCost}</span>
            </li>
          </ul>
      </div>
      <div className="information-cover" onClick={() => handleOpen(props.list.find(item => item.classId === 6))}>
        { props.list.find(item => item.classId === 6)?.deviceState === 0  ? <IconFont style={{ fontSize: '50px' }} type="icon-zidonglanganji" /> : <IconFont style={{ fontSize: '50px' }} type="icon-zhihuilangan" /> }
      </div>
      <CollectionCreateForm
        visible={visible}
        onCreate={onCreate}
        id={props.data.cardId}
        onCancel={() => {
          setVisible(false)
        }}
      />
    </div>
  )
}

export default ParkPanel
