import React from 'react'
import './index.scss'
import { Recharts, Components } from 'react-component-echarts'
import 'echarts'

const { SplitLine, Tooltip, Legend, XAxis, Grid, YAxis, Series } = Components

const ChartComponent = props => {
  return (
    <div className="chart-wrap">
      <Recharts>
        <Tooltip trigger="item" formatter="{a} : {c}" />
        <Legend left="left" data={['温度', '湿度', '光照']} />
        <XAxis type="category" data={props.data.chartData.xAxis}>
          <SplitLine show={false} />
        </XAxis>
        <Grid left="3%" right="4%" bottom="3%" containLabel={true} />
        <YAxis type="log" minorSplitLine={{ show: true }} />
        <Series
          name="温度"
          type="line"
          data={props.data.chartData.temperature}
        />
        <Series name="湿度" type="line" data={props.data.chartData.humidity} />
        <Series
          name="光照"
          type="line"
          data={props.data.chartData.illumination}
        />
      </Recharts>
    </div>
  )
}

export default ChartComponent
