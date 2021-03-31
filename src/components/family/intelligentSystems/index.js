import React from 'react'
import './index.scss'
import SecuritySystem from '../../common/securitySystem/index'
import IconFont from '../../common/IconFont/index'

const IntelligentSystems = () => {
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
  ]

  const handleSwitchChange = (checked, id) => {
    console.log(checked, id)
  }

  return (
    <div className="intelligent-systems-wrap">
      <div className="intelligent-systems">
        <div className="security-system-box">
          <SecuritySystem
            list={controlList}
            handleSwitchChange={handleSwitchChange}
          />
        </div>
      </div>
    </div>
  )
}

export default IntelligentSystems
