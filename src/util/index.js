// 根据 id 找到指定的 val
export const findSpecifiedVal = (id, data) => {
  return data.find(el => el.classId === id)
}

// 根据传入的 list 格式化 data 对象
export const initControlsList = (data, list) => {
  const controlsList = []
  for (let i = 0; i < data.length; i++) {
    for (let j = 0; j < list.length; j++) {
      if (list[j] === data[i].classId)
      controlsList.push(data[i])
    }
  }
  return controlsList
}

export const formatLatestValue = (arr = []) => {
  const chartData = {
    xAxis: [],
    temp: [],
    hum: [],
    light: [],
  }
  arr.forEach(item => {
    chartData.xAxis.push(item.happen_time)
    if (item.device_id === 186) {
      chartData.temp.push(JSON.parse(item.value).value)
    } else if (item.device_id === 185) {
      chartData.hum.push(JSON.parse(item.value).value)
    } else if (item.device_id === 187) {
      chartData.light.push(JSON.parse(item.value).value)
    } 
  })
  return chartData
}

// 日期格式化
export const formatDate = fmt => {
  const now = new Date()
  const o = {
    'M+': now.getMonth() + 1,
    'd+': now.getDate(),
    'h+': now.getHours(),
    'm+': now.getMinutes(),
    's+': now.getSeconds(),
    'q+': Math.floor((now.getMonth() + 3) / 3),
    S: now.getMilliseconds(),
  }
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(
      RegExp.$1,
      (now.getFullYear() + '').substr(4 - RegExp.$1.length)
    )
  }
  for (var k in o) {
    if (new RegExp('(' + k + ')').test(fmt)) {
      fmt = fmt.replace(
        RegExp.$1,
        RegExp.$1.length === 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length)
      )
    }
  }
  return fmt
}
