import React from 'react'
import './index.scss'
import { Recharts, Components } from 'react-component-echarts'
import 'echarts'

const { Title, XAxis, YAxis, Series, Tooltip, Legend, Label } = Components

const renderLine = props => {
  return (
    <div className="chart-wrap">
      <Recharts>
        <Title text={props.title} />
        <XAxis type="category" data={props.x} />
        <YAxis type="value" />
        <Tooltip trigger="axis" />
        <Series
          data={props.y}
          type="line"
          smooth={true}
          itemStyle={{
            normal: { color: '#409eff', lineStyle: { color: '#409eff' } },
          }}
        />
      </Recharts>
    </div>
  )
}

const renderPie = props => {
  console.log(props)
  const dataLength = props.y.reduce(
    // eslint-disable-next-line no-sequences
    (ad, ap) => ((ad[ap] = ++ad[ap] || 1), ad),
    {}
  )
  return (
    <div className="chart-wrap">
      <Recharts color={['#86c56a', '#da0000']}>
        <Title text={props.title} left="center" />
        <Tooltip trigger="item" />
        <Legend orient="vertical" left="left" />
        <Series
          name="状态"
          type="pie"
          radius="50%"
          data={[
            { value: dataLength['0'], name: '正常' },
            { value: dataLength['1'], name: '告警' },
          ]}
        >
          {' '}
          <Label show={false} />{' '}
        </Series>
      </Recharts>
    </div>
  )
}

const ChartLineComponent = props => {
  return props.type === 'line' ? renderLine(props) : renderPie(props)
}

export default ChartLineComponent
