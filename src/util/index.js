export const findRecordsValue = (arr, id) => {
  if (arr.length === 0) return
  return JSON.parse(arr.find(el => el.id === id).latestData.value).value
}

export const formatLatestValue = (arr = []) => {
  const chartData = {
    xAxis: [],
    temperature: [],
    humidity: [],
    illumination: [],
  }
  arr.forEach(item => {
    chartData.xAxis.push(item.happen_time)
    if (item.device_id === 1) {
      chartData.temperature.push(JSON.parse(item.value).value)
    } else if (item.device_id === 2) {
      chartData.humidity.push(JSON.parse(item.value).value)
    }
  })
  return chartData
}
