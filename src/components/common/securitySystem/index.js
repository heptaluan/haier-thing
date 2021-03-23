import React from 'react'
import './index.scss'
import { Switch } from 'antd'

const SecuritySystem = (props) => {

  const onChange = (checked, id) => {
    props.handleSwitchChange(checked, id)
  }

  return (
    <div className="security-system">
      {
        props.list.map(item => (
          <div className={`control-box ${props.type === 'warn' ? 'img-box' : null}`} key={item.id}>
            <h4>{item.title}</h4>
            <>
              {item.cover}
            </>
            {
              item.type === 'switch'
                ? <Switch defaultChecked={false} onChange={e => onChange(e, item.id)} />
                : <p>警告</p>
            }
          </div>
        ))
      }
    </div>
  )
}

export default SecuritySystem
