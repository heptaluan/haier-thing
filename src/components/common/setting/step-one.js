import React, { useEffect, useState } from 'react'
import './index.scss'
import {
  Form,
  Input,
  Button,
  Modal,
  message,
  Select,
  Empty,
  Pagination,
} from 'antd'
import {
  getUserListUrl,
  getAddUserUrl,
  getUserToken,
  getDelUserUrl,
  getGatewayUrl,
  getSchoolListUrl,
} from '../../../api/api'
import axios from 'axios'

const { Option } = Select

const CollectionCreateForm = ({ visible, onCreate, onCancel, schoolList }) => {
  const [gateway, setGateway] = useState([])
  const [val, setVal] = useState('请选择网关')

  useEffect(() => {
    getGateway()
  }, [])

  const getGateway = async () => {
    const result = await axios.get(getGatewayUrl())
    if (result.data.code === '10000') {
      setGateway(result.data.result)
    }
  }

  const [form] = Form.useForm()

  const onSelect = val => {
    setVal(val)
    form.setFieldsValue({
      gateway: val,
    })
  }

  return (
    <Modal
      visible={visible}
      title="新增用户"
      onCancel={onCancel}
      okText="确定"
      cancelText="取消"
      onOk={() => {
        setVal('请选择网关')
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
        <Form.Item
          label="用户姓名"
          name="username"
          rules={[{ required: true, message: '请输入用户名' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="用户密码"
          name="password"
          rules={[{ required: true, message: '请输入密码' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="确认密码"
          name="rePassword"
          dependencies={['password']}
          rules={[
            { required: true, message: '请再次输入密码' },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve()
                }
                return Promise.reject(new Error('两次密码输入不一致'))
              },
            }),
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="学校名称"
          name="schoolId"
          rules={[{ required: true, message: '请选择学校名称' }]}
        >
          <Select placeholder="请选择学校">
            {schoolList?.map((item, index) => (
              <Option value={item.id} key={`option-${index}`}>
                {item.schoolName}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          label="网关名称"
          name="gateway"
          rules={[{ required: true, message: '请选择网关' }]}
        >
          <Input className="form-input" placeholder="请选择网关或者手动输入" />
        </Form.Item>
      </Form>
      <Select
        value={val}
        className="form-select"
        placeholder="请选择网关"
        onSelect={onSelect}
      >
        {gateway?.map((item, index) => (
          <Option value={item} key={`option-${index}`}>
            {item}
          </Option>
        ))}
      </Select>
    </Modal>
  )
}

const StepOne = () => {
  axios.defaults.headers.common['Authorization'] = getUserToken()
  const [data, setData] = useState([])
  const [total, setTotal] = useState(1)

  const [schoolList, setschoolList] = useState([])

  useEffect(() => {
    fetchData()
    getSchoolList()
  }, [])

  // 用户列表
  const fetchData = async page => {
    const result = await axios.post(getUserListUrl(), {
      page: page ? page : 1,
      size: 10,
      school: null,
    })
    if (result.data.code === '10000') {
      setTotal(result.data.result.total)
      setData(result.data.result.records)
    }
  }

  // 学校列表
  const getSchoolList = async () => {
    const result = await axios.get(getSchoolListUrl())
    if (result.data.code === '10000') {
      setschoolList(result.data.result.records)
    }
  }

  // 新增用户
  const [visible, setVisible] = useState(false)
  const onCreate = values => {
    axios
      .post(getAddUserUrl(), {
        ...values,
      })
      .then(res => {
        if (res.data.code === '10000') {
          setVisible(false)
          fetchData()
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

  const deleteUser = id => {
    const userData = data.find(item => item.userNo === id)
    axios.delete(getDelUserUrl(userData.userNo)).then(res => {
      if (res.data.code === '10000') {
        setVisible(false)
        fetchData()
        message.success(`删除成功`)
      }
    })
  }

  const onChange = val => {
    axios
      .post(getUserListUrl(), {
        page: 1,
        size: 10,
        school: val ? [val] : null,
      })
      .then(res => {
        if (res.data.code === '10000') {
          setData(res.data.result.records)
          setTimeout(() => {
            message.success(`筛选成功`)
          }, 300)
        }
      })
  }

  const handlePaginationChange = e => {
    fetchData(e)
  }

  return (
    <div className="tab-one">
      <div className="btn-groups">
        <Button
          type="primary"
          onClick={() => {
            open()
          }}
        >
          新增用户
        </Button>
        <div className="search-input">
          <Select
            style={{ width: 150 }}
            placeholder="请选择筛选条件"
            onChange={onChange}
            allowClear
          >
            {schoolList?.map((item, index) => (
              <Option value={item.id} key={`option-${index}`}>
                {item.schoolName}
              </Option>
            ))}
          </Select>
        </div>
      </div>
      <div className="table-header">
        <span className="name">用户名</span>
        <span className="password">密码</span>
        <span className="schoolname">学校名称</span>
        <span className="gateway">网关</span>
        <span className="edit-box">操作</span>
      </div>
      <ul className="user-list">
        {data.length === 0 ? (
          <Empty />
        ) : (
          data.map(item => (
            <li key={item.userNo}>
              <span className="name">{item.username}</span>
              <span className="password">****</span>
              <span className="schoolname">{item.school.schoolName}</span>
              <span className="gateway">{item.gateway}</span>
              <span className="edit-box">
                <Button
                  onClick={() => {
                    deleteUser(item.userNo)
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
      {data.length === 0 ? null : (
        <div className="pagination">
          <Pagination onChange={handlePaginationChange} total={total} />
        </div>
      )}
      <CollectionCreateForm
        visible={visible}
        onCreate={onCreate}
        onCancel={() => {
          setVisible(false)
        }}
        schoolList={schoolList}
      />
    </div>
  )
}

export default StepOne
