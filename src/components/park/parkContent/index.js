import React, { useState } from 'react'
import './index.scss'
import IconFont from '../../common/IconFont/index'
import { DatePicker, Space, Tabs } from 'antd'
import ParkPanel from '../parkPanel/index'
import CameraComponent from '../../common/cameraComponent/index'
import ChartViewList from '../../common/chartViewList/index'
import 'moment/locale/zh-cn'
import locale from 'antd/es/date-picker/locale/zh_CN'
import ParkList from '../parkList/index'

const { TabPane } = Tabs

const ParkContent = () => {
  const tempStatus = {
    temperature: '---',
    humidity: '---',
    illumination: '---',
    chartData: {
      xAxis: [],
      temperature: [],
      humidity: [],
      illumination: [],
    },
  }

  const handleDateChange = (date, dateString) => {
    console.log(date, dateString)
  }

  const [showDate, setShowDate] = useState(false)

  const onTabClick = key => {
    key === '2' ? setShowDate(true) : setShowDate(false)
  }

  const operations = () => {
    return showDate ? (
      <Space direction="vertical">
        <DatePicker locale={locale} onChange={handleDateChange} />
      </Space>
    ) : null
  }

  const controlsList = [
    {
      id: 1,
      onIcon: <IconFont style={{ fontSize: '45px' }} type="icon-rentiganying" />,
      title: '人体感应',
      stateText: '正常',
      state: false,
    },
    {
      id: 2,
      onIcon: (
        <IconFont style={{ fontSize: '45px' }} type="icon-hongwaijiance" />
      ),
      title: '红外警戒',
      stateText: '正常',
      state: true,
    },
    {
      id: 3,
      onIcon: (
        <IconFont style={{ fontSize: '45px' }} type="icon-yanwujiance_1" />
      ),
      offIcon: null,
      title: '烟雾感应',
      stateText: '正常',
      state: false,
    },
    {
      id: 4,
      onIcon: <IconFont style={{ fontSize: '45px' }} type="icon-ranqi" />,
      offIcon: null,
      title: '燃气感应',
      stateText: '正常',
      state: true,
    },
    {
      id: 5,
      onIcon: (
        <IconFont style={{ fontSize: '45px' }} type="icon-jingbaobaojing1" />
      ),
      offIcon: (
        <IconFont style={{ fontSize: '45px' }} type="icon-jingbaobaojing" />
      ),
      title: '紧急报警',
      stateText: '正常',
      state: false,
    },
  ]

  const [states, setState] = useState(controlsList)

  const updateCurState = (id, checked) => {
    const updateData = states.map(item => {
      if (item.id === id) {
        item.state = checked
        if (id === 5) {
          item.stateText = checked ? '警告' : '正常'
        }
        return item
      }
      return item
    })
    setState(updateData)
  }

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
    <div className="park-content-box">
      <Tabs tabBarExtraContent={operations()} onTabClick={onTabClick}>
        <TabPane tab="智慧园区" key="1">
          <div className="view-box-wrap">
            <ul>
              {states.map(item => (
                <li key={item.id}>
                  <ParkList data={item} updateCurState={updateCurState} />
                </li>
              ))}
            </ul>
            <div className="view-box">
              <div className="view-box-first">
                <ParkPanel />
              </div>
              <div className="view-box-last">
                <CameraComponent />
              </div>
            </div>
          </div>
        </TabPane>
        <TabPane tab="历史数据" key="2">
          <ChartViewList tempStatus={tempStatus} />
        </TabPane>
      </Tabs>
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
            <div>
              <Input />
            </div>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}

export default ParkContent
