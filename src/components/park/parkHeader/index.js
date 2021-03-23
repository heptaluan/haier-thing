import React from 'react'
import './index.scss'
import { Link } from 'react-router-dom'

const ParkHeader = () => {
  return (
    <div className="park-header">
      <span className="park-title">
        <Link to="/">Haier 智慧园区</Link>
      </span>
    </div>
  )
}

export default ParkHeader
