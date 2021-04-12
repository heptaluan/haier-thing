import React from 'react'
import './index.scss'
import ChartLineComponent from '../chartLineComponent/index'

const ChartViewList = props => {
  return (
    <div className="chart-view-list">
      <ChartLineComponent data={props.tempStatus} />
    </div>
  )
}

export default ChartViewList
