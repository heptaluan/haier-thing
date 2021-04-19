import React, { useState } from 'react'
import './index.scss'
import { Modal, Form, Input, message, Button, DatePicker } from 'antd'
import IconFont from '../../common/IconFont/index'
import axios from 'axios'
import { getRegisterUrl, getDeleteUrl, getUserToken, getSceneId } from '../../../api/api'
import 'moment/locale/zh-cn'
import locale from 'antd/es/date-picker/locale/zh_CN'
import moment from 'moment'

const CollectionCreateForm = ({ visible, onCreate, onCancel, data }) => {
  const [form] = Form.useForm()
  const handlePreinstall = () => {
    const now = moment().locale('zh-cn').format('YYYY-MM-DD HH:mm:ss')
    form.setFieldsValue({
      courseName: '课程名称',
      startTime: moment(`${now}`, 'YYYY-MM-DD HH:mm:ss'),
      endTime: moment(`${now}`, 'YYYY-MM-DD HH:mm:ss'),
      name: '张三',
      studentCount: '25',
    })
  }
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
          .catch(info => {})
      }}
    >
      <Form form={form} name="basic" initialValues={{ remember: true }}>
        <Button
          size="small"
          type="primary"
          className="preinstall"
          onClick={() => handlePreinstall()}
        >
          预设
        </Button>
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
          rules={[{ required: true, message: '请输入课程开始时间' }]}
        >
          <DatePicker locale={locale} showTime />
        </Form.Item>
        <Form.Item
          label="结束时间"
          name="endTime"
          rules={[{ required: true, message: '请输入课程结束时间' }]}
        >
          <DatePicker locale={locale} showTime />
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
          rules={[
            {
              required: true,
              pattern: new RegExp(/^[1-9]\d*$/, 'g'),
              message: '请输入学生人数',
            },
          ]}
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
    const data = {
      ...values,
      cardId: props.data.cardId,
      startTime: values.startTime.format('YYYY-MM-DD HH:mm:ss'),
      endTime: values.endTime.format('YYYY-MM-DD HH:mm:ss'),
    }
    axios
      .post(getRegisterUrl(), {
        type: getSceneId().education,
        value: {
          ...data,
        },
        cardId: props.data.cardId,
      })
      .then(res => {
        if (res.data.code === '10000') {
          message.success(`信息录入成功`)
          setVisible(false)
        } else if (res.data.code === '20000') {
          message.success(`卡片已经注册`)
        }
      })
    setVisible(false)
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
      axios
        .post(getDeleteUrl(), {
          type: getSceneId().education,
          cardId: data.cardId,
        })
        .then(res => {
          if (res.data.code === '10000') {
            message.success(`信息注销成功`)
            props.setData({
              cardId: '-- --',
              courseName: '-- --',
              startTime: '-- --',
              endTime: '-- --',
              name: '-- --',
              studentCount: '-- --',
            })
            setVisible(false)
          } else if (res.data.code === '20000') {
            message.success(`信息注销失败，请重新尝试`)
          }
        })
    } else {
      message.error(`请先进行信息登记`)
    }
  }

  return (
    <div className="education-control-wrap">
      <div className="btn-group">
        <Button className="edit" onClick={() => handleRegister(props.data)}>
          课程录入
        </Button>
        <Button className="edit" onClick={() => handleDelete(props.data)}>
          课程删除
        </Button>
      </div>
      <ul className="education-control">
        <li>
          <IconFont style={{ fontSize: '26px' }} type="icon-kapian" />
          <span className="education-text">卡片编号：{props.data.cardId}</span>
        </li>
        <li>
          <IconFont style={{ fontSize: '26px' }} type="icon-shuji" />
          <span className="education-text">
            课程名称：{props.data.courseName}
          </span>
        </li>
        <li>
          <IconFont
            style={{ fontSize: '26px' }}
            type="icon-shijiankaishishijian"
          />
          <span className="education-text">
            开始时间：{props.data.startTime}
          </span>
        </li>
        <li>
          <IconFont style={{ fontSize: '26px' }} type="icon-jieshushijian" />
          <span className="education-text">
            结束时间：{props.data.startTime}
          </span>
        </li>
        <li>
          <IconFont style={{ fontSize: '26px' }} type="icon-yonghuxinxi" />
          <span className="education-text">教师姓名：{props.data.name}</span>
        </li>
        <li>
          <IconFont style={{ fontSize: '26px' }} type="icon-yonghu" />
          <span className="education-text">
            学生人数：{props.data.studentCount}
          </span>
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
