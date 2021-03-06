import React, { useEffect, useState } from 'react'
import './index.scss'
import { Form, Input, Button, Modal, message, Select, Empty } from 'antd'
import {
  getUserToken,
  getCameraListUrl,
  getUpdateCameraInfo,
  pushCameraUrl,
  getDeleteCameraUrl,
  getUserListUrl,
  getBindUserUrl,
} from '../../../api/api'
import axios from 'axios'

const CameraSetting = ({ visible, onCreate, onCancel, data }) => {
  const [form] = Form.useForm()
  setTimeout(() => {
    data.userName ? form.setFieldsValue({ ...data }) : form.resetFields()
  }, 300)
  return (
    <Modal
      forceRender
      visible={visible}
      title="新增摄像头"
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
          label="用户姓名"
          name="userName"
          rules={[{ required: true, message: '请输入用户姓名' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="用户密码"
          name="userPassword"
          rules={[{ required: true, message: '请输入用户密码' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="连接地址"
          name="ipAddress"
          rules={[{ required: true, message: '请输入连接地址' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="端口地址"
          name="portAddress"
          rules={[{ required: true, message: '请输入端口地址' }]}
        >
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  )
}

const { Option } = Select

const BindUser = ({ visible, onCreate, onCancel, data }) => {
  const [form] = Form.useForm()
  setTimeout(() => {
    data.userName ? form.setFieldsValue({ ...data }) : form.resetFields()
  }, 300)
  return (
    <Modal
      forceRender
      visible={visible}
      title="新增摄像头"
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
          label="用户列表"
          name="cameraId"
          rules={[{ required: true, message: '请选择用户' }]}
        >
          <Select placeholder="请选择用户">
            {data?.map((item, index) => (
              <Option value={item.userNo} key={`option-${index}`}>
                {item.username}
              </Option>
            ))}
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  )
}

const StepThree = () => {
  axios.defaults.headers.common['Authorization'] = getUserToken()

  const [cameraList, setCameraList] = useState([])
  const [data, setData] = useState([])

  useEffect(() => {
    fetchData()
    getCameraList()
  }, [])

  // 用户列表
  const fetchData = async () => {
    const result = await axios.post(getUserListUrl(), {
      page: 1,
      size: 10,
      school: null,
    })
    if (result.data.code === '10000') {
      setData(result.data.result.records)
    }
  }

  const getCameraList = async () => {
    const result = await axios.get(getCameraListUrl())
    if (result.data.code === '10000') {
      setCameraList(result.data.result)
    }
  }

  const [cameraVisible, setCameraVisible] = useState(false)
  const onSubmit = values => {
    axios
      .post(getUpdateCameraInfo(), {
        id: curData.id ? curData.id : null,
        ...values,
      })
      .then(res => {
        if (res.data.code === '10000') {
          setCameraVisible(false)
          setTimeout(() => {
            getCameraList()
          }, 300)
          if (curData.userName) {
            message.success(`更新成功`)
          } else {
            message.success(`新增成功`)
          }
        } else {
          if (curData.userName) {
            message.error(`更新失败`)
          } else {
            message.error(`新增失败`)
          }
          setCameraVisible(false)
        }
      })
  }

  const [bindUser, setBindUser] = useState(false)
  const onBoundUserSubmit = values => {
    axios
      .post(getBindUserUrl(), {
        cameraId: cameraId,
        userNo: values.cameraId,
      })
      .then(res => {
        if (res.data.code === '10000') {
          setBindUser(false)
          setTimeout(() => {
            getCameraList()
          }, 300)
          message.success(`绑定成功`)
        } else {
          message.error(`绑定失败`)
        }
      })
  }

  const handleDelete = id => {
    axios.delete(getDeleteCameraUrl(id)).then(res => {
      if (res.data.code === '10000') {
        setCameraVisible(false)
        getCameraList()
        message.success(`删除成功`)
      }
    })
  }

  const handleStart = id => {
    axios.get(pushCameraUrl(id)).then(res => {
      if (res.data.code === '10000') {
        message.success(`推流开启成功`)
      } else {
        message.error(`推流开启失败，请重新尝试`)
      }
      setTimeout(() => {
        getCameraList()
      }, 300)
    })
  }

  const handleEnd = id => {
    axios.delete(pushCameraUrl(id)).then(res => {
      if (res.data.code === '10000') {
        message.success(`关闭成功`)
      } else {
        message.error(`关闭失败，请重新尝试`)
      }
      setTimeout(() => {
        getCameraList()
      }, 300)
    })
  }

  const [curData, setCurData] = useState({})
  const [cameraId, setCameraId] = useState(null)

  const open = () => {
    setCurData({})
    setCameraVisible(true)
  }

  const openBindUser = item => {
    setCameraId(item.id)
    setBindUser(true)
  }

  const edit = item => {
    setCurData(item)
    setCameraVisible(true)
  }

  return (
    <div className="tab-three">
      <div className="btn-groups">
        <Button
          type="primary"
          onClick={() => {
            open()
          }}
        >
          新增摄像头
        </Button>
      </div>
      <div className="table-header">
        <span className="name">用户姓名</span>
        <span className="password">用户密码</span>
        <span className="user">绑定用户</span>
        <span className="ip-address">连接地址</span>
        <span className="port-address">端口地址</span>
        <span className="state">摄像头状态</span>
        <span className="edit-box">操作</span>
      </div>
      <ul className="user-list">
        {cameraList.length === 0 ? (
          <Empty />
        ) : (
          cameraList.map(item => (
            <li key={item.id}>
              <span className="name">{item.userName}</span>
              <span className="password">****</span>
              <span className="user">{item.bindUserName}</span>
              <span className="ip-address">{item.ipAddress}</span>
              <span className="port-address">{item.portAddress}</span>
              <span className="state">
                {item.status === 0 ? '已关闭' : '推流中'}
              </span>
              <span className="edit-box">
                <Button
                  onClick={() => {
                    handleStart(item.id)
                  }}
                  type="primary"
                >
                  开启推流
                </Button>
                <Button
                  onClick={() => {
                    handleEnd(item.id)
                  }}
                  type="primary"
                >
                  关闭推流
                </Button>
                <Button
                  onClick={() => {
                    edit(item)
                  }}
                  type="primary"
                >
                  编辑
                </Button>
                <Button
                  onClick={() => {
                    handleDelete(item.id)
                  }}
                  type="primary"
                >
                  删除
                </Button>
                <Button
                  onClick={() => {
                    openBindUser(item)
                  }}
                  type="primary"
                >
                  用户绑定
                </Button>
              </span>
            </li>
          ))
        )}
      </ul>
      <CameraSetting
        visible={cameraVisible}
        onCreate={onSubmit}
        onCancel={() => {
          setCameraVisible(false)
        }}
        data={curData}
      />
      <BindUser
        visible={bindUser}
        onCreate={onBoundUserSubmit}
        onCancel={() => {
          setBindUser(false)
        }}
        data={data}
      />
    </div>
  )
}

export default StepThree
