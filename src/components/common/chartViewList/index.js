import React from 'react'
import './index.scss'
import ChartComponent from '../chartComponent/index'

const ChartViewList = props => {
  return (
    <div className="chart-view-list">
      <ChartComponent data={props.tempStatus} />
    </div>
  )
}

export default ChartViewList
