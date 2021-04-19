import React from 'react'
import './index.scss'
import IconFont from '../../common/IconFont/index'
import { Switch, Button, Badge } from 'antd'
import CameraComponent from '../../common/cameraComponent/index'
import { findSpecifiedVal } from '../../../util/index'
import { message } from 'antd'
import axios from 'axios'
import {
  getRegisterUrl,
  getDeleteUrl,
  getDevicesControllerUrl,
  getSceneId,
  getUserToken,
} from '../../../api/api'

const formatData = data => {
  if (data[0]) {
    return {
      human: findSpecifiedVal(5, data),
      locked: findSpecifiedVal(9, data),
      warn: findSpecifiedVal(10, data),
      rke: findSpecifiedVal(17, data),
      fire: findSpecifiedVal(2, data),
      ray: findSpecifiedVal(4, data),
    }
  }
}

const AccessList = props => {
  axios.defaults.headers.common['Authorization'] = getUserToken()
  const handleSwitchChange = (checked, e) => {
    const id = Number(e.target.id || e.target.parentNode.id)
    props.updateSwitchState(
      checked,
      props.data.find(item => item.classId === id),
      2
    )
  }

  const data = formatData(props.data)

  const handleRegister = data => {
    if (data.cardId !== '-- --') {
      axios.post(getRegisterUrl(), {
        type: getSceneId().family,
        value: {
          cardId: data.cardId,
        },
        cardId: data.cardId,
      }).then(res => {
        if (res.data.code === '10000') {
          message.success(`信息录入成功`)
        } else if (res.data.code === '20000') {
          message.success(`卡片已经注册`)
        }
      })
    } else {
      message.error(`请先进行信息登记`)
    }
  }

  const handleDelete = data => {
    if (data.cardId !== '-- --') {
      axios.post(getDeleteUrl(), {
        type: getSceneId().family,
        cardId: data.cardId,
      }).then(res => {
        if (res.data.code === '10000') {
          message.success(`信息注销成功`)
          props.setLockData({
            cardId: '-- --',
            show: false,
            state: false
          })
        } else if (res.data.code === '20000') {
          message.success(`卡片还未注册`)
        }
      })
    } else {
      message.error(`请先进行信息登记`)
    }
  }

  const handleOpen = data => {
    const lock = data.find(item => item.classId === 9)
    axios.post(getDevicesControllerUrl(), {
      sceneId: getSceneId().family,
      groupId: 1,
      deviceId: lock.id,
      operationId: lock.operations.find(item => item.operation_type === 1).id,
    }).then(res => {
      if (res.data.result) {
        message.success(`门锁打开成功`)
      } else {
        message.success(`门锁打开失败，请重新尝试`)
      }
    })
  }

  return (
    <div className="access-box view-box-wrap access-list">
      <ul>
        <li className="btn-group">
          <div className="icon-box">
            <IconFont style={{ fontSize: '45px' }} type="icon-zhuangtai" />
          </div>
          <div className="controls-name">
            <span>
              {props.lockData.show ? (props.lockData.state ? (
                <Badge
                  count={'认证成功'}
                  style={{ backgroundColor: '#52c41a' }}
                />
              ) : (
                <Badge
                  count={'等待认证'}
                  style={{ backgroundColor: '#ff4d4f' }}
                />
              )) : null}
            </span>
          </div>
          <div className="controls-edit">
            <div className="edit-box">
              <Button
                icon={
                  <IconFont
                    style={{ fontSize: '18px' }}
                    type="icon-jurassic_edit-user"
                  />
                }
                onClick={() => handleRegister(props.lockData)}
              >
                录入身份
              </Button>
            </div>
            <div className="edit-box">
              <Button
                icon={
                  <IconFont
                    style={{ fontSize: '18px' }}
                    type="icon-jurassic_delete-user"
                  />
                }
                onClick={() => handleDelete(props.lockData)}
              >
                删除身份
              </Button>
            </div>
            <div className="edit-box">
              <Button
                icon={
                  <IconFont
                    style={{ fontSize: '18px' }}
                    type="icon-zhinengmensuo"
                  />
                }
                onClick={() => handleOpen(props.data)}
              >
                打开门锁
              </Button>
            </div>
          </div>
        </li>
        <li>
          <div className="icon-box">
            <IconFont style={{ fontSize: '45px' }} type="icon-rentiganying" />
          </div>
          <div className="controls-name">
            <span>{data?.human.name}</span>
            <span>设备id：{data?.human.id}</span>
          </div>
          <div className="controls-state">
            {props.data.find(item => item.classId === 5)?.latestData &&
            JSON.parse(
              props.data.find(item => item.classId === 5)?.latestData.value
            ).value === 1 ? (
              <Badge count={'异常'} style={{ backgroundColor: '#ff4d4f' }} />
            ) : (
              <Badge count={'正常'} style={{ backgroundColor: '#52c41a' }} />
            )}
          </div>
          <div className="controls-switch">
            <Switch
              id={5}
              checked={props.data.find(item => item.classId === 5).deviceState === 0 ? false : true}
              defaultChecked={false}
              onChange={handleSwitchChange}
            />
          </div>
        </li>
        <li>
          <div className="icon-box">
            <IconFont style={{ fontSize: '45px' }} type="icon-hongwaijiance" />
          </div>
          <div className="controls-name">
            <span>{data?.ray.name}</span>
            <span>设备id：{data?.ray.id}</span>
          </div>
          <div className="controls-state">
            {props.data.find(item => item.classId === 4)?.latestData &&
            JSON.parse(
              props.data.find(item => item.classId === 4)?.latestData.value
            ).value === 1 ? (
              <Badge count={'异常'} style={{ backgroundColor: '#ff4d4f' }} />
            ) : (
              <Badge count={'正常'} style={{ backgroundColor: '#52c41a' }} />
            )}
          </div>
          <div className="controls-switch">
            <Switch
              id={4}
              checked={props.data.find(item => item.classId === 4).deviceState === 0 ? false : true}
              defaultChecked={false}
              onChange={handleSwitchChange}
            />
          </div>
        </li>
        <li>
          <div className="icon-box">
            <IconFont style={{ fontSize: '45px' }} type="icon-yanwujiance_1" />
          </div>
          <div className="controls-name">
            <span>{data?.fire.name}</span>
            <span>设备id：{data?.fire.id}</span>
          </div>
          <div className="controls-state">
            {props.data.find(item => item.classId === 2)?.latestData &&
            JSON.parse(
              props.data.find(item => item.classId === 2)?.latestData.value
            ).value === 1 ? (
              <Badge count={'异常'} style={{ backgroundColor: '#ff4d4f' }} />
            ) : (
              <Badge count={'正常'} style={{ backgroundColor: '#52c41a' }} />
            )}
          </div>
          <div className="controls-switch">
            <Switch
              id={2}
              checked={props.data.find(item => item.classId === 2).deviceState === 0 ? false : true}
              defaultChecked={false}
              onChange={handleSwitchChange}
            />
          </div>
        </li>
        <li>
          <div className="icon-box">
            <IconFont style={{ fontSize: '45px' }} type="icon-jingbaobaojing" />
          </div>
          <div className="controls-name">
            <span>{data?.warn.name}</span>
            <span>设备id：{data?.warn.id}</span>
          </div>
          <div className="controls-state">
            {props.data.find(item => item.classId === 10)?.latestData &&
            JSON.parse(
              props.data.find(item => item.classId === 10)?.latestData.value
            ).value === 1 ? (
              <Badge count={'异常'} style={{ backgroundColor: '#ff4d4f' }} />
            ) : (
              <Badge count={'正常'} style={{ backgroundColor: '#52c41a' }} />
            )}
          </div>
          <div className="controls-switch">
            <div>
              <Button
                onClick={() => handleSwitchChange(true, { target: { id: 10 } })}
              >
                开启
              </Button>
              &nbsp;&nbsp;&nbsp;&nbsp;
              <Button
                onClick={() =>
                  handleSwitchChange(false, { target: { id: 10 } })
                }
              >
                关闭
              </Button>
            </div>
          </div>
        </li>
      </ul>
      <div className="view-box">
        <div className="view-box-first">{props.lockData.cardId}</div>
        <div className="view-box-last">
          <CameraComponent />
        </div>
      </div>
    </div>
  )
}

export default AccessList
