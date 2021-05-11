import React, { useEffect, useState } from 'react'
import './index.scss'
import { Form, Input, Button, Modal, message, Select } from 'antd'
import {
  getUserListUrl,
  getAddUserUrl,
  getUserToken,
  getDelUserUrl,
} from '../../../api/api'
import axios from 'axios'

const { Option } = Select

const CollectionCreateForm = ({ visible, onCreate, onCancel }) => {
  const [schoolList, setschoolList] = useState([])

  useEffect(() => {
    getSchoolList()
  }, [])

  // 大学的列表信息
  const getSchoolList = async () => {
    const result = await axios.get(getDelUserUrl())
    if (result.data.code === '10000') {
      setschoolList(result.data.result)
    }
  }

  const [form] = Form.useForm()
  return (
    <Modal
      visible={visible}
      title="新增大学"
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
        <Form.Item
          label="大学名称"
          name="schoolname"
          rules={[{ required: true, message: '请选择大学名称' }]}
        >
          <Select>
            {schoolList?.map((item, index) => (
              <Option value={item} key={`option-${index}`}>
                {item}
              </Option>
            ))}
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  )
}

const { Search } = Input

const StepTwo = () => {
  axios.defaults.headers.common['Authorization'] = getUserToken()
  const [data, setData] = useState([
    {
      id: 1,
      name: '张三',
      schoolname: '武汉大学',
    },
    {
      id: 2,
      name: '李四',
      schoolname: '未绑定',
    },
  ])

  // useEffect(() => {
  //   fetchData()
  // }, [])

  const fetchData = async () => {
    const result = await axios.get(getUserListUrl())
    if (result.data.code === '10000') {
      setData(result.data.result.records)
    }
  }

  // 新增大学
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

  const handleBind = id => {
    const userData = data.find(item => item.userNo === id)
    axios.delete(getDelUserUrl(userData.userNo)).then(res => {
      if (res.data.code === '10000') {
        setVisible(false)
        fetchData()
        message.success(`删除成功`)
      }
    })
  }

  const onSearch = val => {
    setData([
      {
        id: 1,
        name: '张三',
        schoolname: '武汉大学',
      }
    ])
  }

  return (
    <div className="tab-two">
      <div className="btn-groups">
        {/* <Button
          type="primary"
          onClick={() => {
            open()
          }}
        >
          新增大学
        </Button> */}
        <div></div>
        <div className="search-input">
          <Search
            placeholder="请输入需要查询的大学"
            onSearch={onSearch}
            style={{ width: 300 }}
          />
        </div>
      </div>
      <div className="table-header">
        <span className="name">用户</span>
        <span className="schoolname">大学名称</span>
        <span className="edit-box">状态</span>
      </div>
      <ul className="user-list">
        {data.map(item => (
          <li key={item.id}>
            <span className="name">{item.name}</span>
            <span className="schoolname">{item.schoolname}</span>
            <span className="edit-box">
              {item.schoolname === '未绑定' ? (
                <Button
                  onClick={() => {
                    open(item.id)
                  }}
                  type="primary"
                >
                  绑定
                </Button>
              ) : (
                '已绑定'
              )}
            </span>
          </li>
        ))}
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
