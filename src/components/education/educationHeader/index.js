import React from 'react'
import './index.scss'
import { Link } from 'react-router-dom'
import IconFont from '../../common/IconFont/index'
import ClockComponent from '../../common/clockComponent/index'

const EducationHeader = () => {
  return (
    <div className="education-header">
      <span className="education-title">
        <Link to="/">Haier 智慧教育</Link>
      </span>
      <span className="education-class">
        <IconFont style={{ fontSize: '26px' }} type="icon-yonghuxinxi" />{' '}
        计科（三班）
      </span>
      <span className="education-clock">
        <IconFont style={{ fontSize: '26px' }} type="icon-shizhong" /> 
        <ClockComponent />
      </span>
    </div>
  )
}

export default EducationHeader
