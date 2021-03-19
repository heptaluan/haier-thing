import React from 'react'
import './index.scss'

import on from '../../../assets/images/on.png'

const EducationHeader = () => {
  return (
    <div className="education-header">
      <span>Haier 智慧教育</span>
      <span>
        <img src={on} alt="class-img" /> 几棵（三班）
      </span>
      <span>
        <img src={on} alt="class-img" /> 10:30
      </span>
    </div>
  )
}

export default EducationHeader
