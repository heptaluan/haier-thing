import React from 'react'
import './index.scss'
import { Recharts, Components } from 'react-component-echarts'
import 'echarts'

const { Title, XAxis, YAxis, Series } = Components

const ChartLineComponent = props => {
  return (
    <div className="chart-wrap">
      <Recharts>
        <Title text={props.title} />
        <XAxis
          type="category"
          data={props.xAxis}
        />
        <YAxis type="value" />
        <Series
          data={props.data}
          type="line"
          smooth={true}
        />
      </Recharts>
    </div>
  )
}

export default ChartLineComponent
