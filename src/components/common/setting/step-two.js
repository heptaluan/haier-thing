import React, { useEffect, useState } from 'react'
import './index.scss'
import { Form, Input, Button, Modal, message, Empty } from 'antd'
import {
  getSchoolListUrl,
  getUserToken,
  addSchoolListUrl,
  delSchoolListUrl,
} from '../../../api/api'
import axios from 'axios'
import { ExclamationCircleOutlined } from '@ant-design/icons'

const { confirm } = Modal

const CollectionCreateForm = ({ visible, onCreate, onCancel }) => {
  const [form] = Form.useForm()
  const formItemLayout = {
    labelCol: { span: 4 },
  }
  return (
    <Modal
      visible={visible}
      title="新增学校"
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
      <Form
        {...formItemLayout}
        form={form}
        name="basic"
        initialValues={{ remember: true }}
      >
        <Form.Item
          label="学校名称"
          name="schoolName"
          rules={[{ required: true, message: '请输入学校名称' }]}
        >
          <Input placeholder="请输入学校名称" />
        </Form.Item>
        <Form.Item
          label="备注信息"
          name="remark"
          rules={[{ message: '请输入备注信息' }]}
        >
          <Input placeholder="请输入备注信息" />
        </Form.Item>
      </Form>
    </Modal>
  )
}

const StepTwo = () => {
  axios.defaults.headers.common['Authorization'] = getUserToken()

  const [schoolList, setschoolList] = useState([])

  useEffect(() => {
    getSchoolList()
  }, [])

  // 学校的列表信息
  const getSchoolList = async () => {
    const result = await axios.get(getSchoolListUrl())
    if (result.data.code === '10000') {
      setschoolList(result.data.result.records)
    }
  }

  // 新增学校
  const [visible, setVisible] = useState(false)
  const onCreate = values => {
    axios
      .post(addSchoolListUrl(), {
        ...values,
      })
      .then(res => {
        if (res.data.code === '10000') {
          setVisible(false)
          getSchoolList()
          message.success(`新增成功`)
        } else {
          message.error(`新增失败`)
          setVisible(false)
        }
      })
  }

  const open = () => {
    setVisible(true)
  }

  const handleDelete = id => {
    confirm({
      title: '是否确定删除学校信息',
      icon: <ExclamationCircleOutlined />,
      content: '删除学校信息的同时也会清空该学校下的用户信息',
      okText: '确定',
      okType: 'danger',
      cancelText: '取消',
      onOk() {
        const userData = schoolList.find(item => item.id === id)
        axios.delete(delSchoolListUrl(userData.id)).then(res => {
          if (res.data.code === '10000') {
            setVisible(false)
            getSchoolList()
            message.success(`删除成功`)
          }
        })
      },
      onCancel() {
        console.log('Cancel')
      },
    })
  }

  return (
    <div className="tab-two">
      <div className="btn-groups">
        <Button
          type="primary"
          onClick={() => {
            open()
          }}
        >
          新增学校
        </Button>
      </div>
      <div className="table-header">
        <span className="name">学校名称</span>
        <span className="desc">备注</span>
        <span className="edit-box">操作</span>
      </div>
      <ul className="user-list">
        {schoolList.length === 0 ? (
          <Empty />
        ) : (
          schoolList?.map(item => (
            <li key={item.id}>
              <span className="name">{item.schoolName}</span>
              <span className="desc">{item.remark}</span>
              <span className="edit-box">
                <Button
                  onClick={() => {
                    handleDelete(item.id)
                  }}
                  type="primary"
                >
                  删除
                </Button>
              </span>
            </li>
          ))
        )}
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

export default StepTwo
