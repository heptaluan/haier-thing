import React from 'react'
import './index.scss'
import IconFont from '../../common/IconFont/index'
import SecuritySystem from '../../common/securitySystem/index'

const InformationControl = () => {
  const controlList = [
    {
      id: '0',
      title: '人体感应',
      type: 'switch',
      cover: <IconFont style={{ fontSize: '45px' }} type="icon-rentiganying" />,
    },
    {
      id: '1',
      title: '红外警戒',
      type: 'switch',
      cover: (
        <IconFont style={{ fontSize: '45px' }} type="icon-hongwaijiance" />
      ),
    },
    {
      id: '2',
      title: '烟雾感应',
      type: 'switch',
      cover: <IconFont style={{ fontSize: '45px' }} type="icon-yanwujiance_1" />,
    },
    {
      id: '3',
      title: '煤气感应',
      type: 'switch',
      cover: <IconFont style={{ fontSize: '45px' }} type="icon-ranqi" />,
    },
    {
      id: '4',
      title: '紧急报警',
      type: 'warn',
      cover: (
        <IconFont style={{ fontSize: '45px' }} type="icon-jingbaobaojing" />
      ),
    },
  ]

  const handleSwitchChange = (checked, id) => {
    console.log(checked, id)
  }

  return (
    <div className="information-control">
      <SecuritySystem
        list={controlList}
        handleSwitchChange={handleSwitchChange}
      />
    </div>
  )
}

export default InformationControl
