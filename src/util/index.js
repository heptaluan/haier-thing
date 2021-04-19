import { latestConfig } from './config'

export const deepClone = (target) => {
  if (typeof target === 'object' && target !== null) {
    const cloneTarget = Array.isArray(target) ? [] : {}
    for (let prop in target) {
      if (target.hasOwnProperty(prop)) {
        cloneTarget[prop] = deepClone(target[prop])
      }
    }
    return cloneTarget
  } else {
    return target
  }
}

// 根据 id 找到指定的 val
export const findSpecifiedVal = (id, data) => {
  return data.find(el => el.classId === id)
}

// 根据传入的 list 格式化 data 对象
export const initControlsList = (data, list) => {
  const controlsList = []
  for (let i = 0; i < data.length; i++) {
    for (let j = 0; j < list.length; j++) {
      if (list[j] === data[i].classId) controlsList.push(data[i])
    }
  }
  return controlsList
}

export const formatLatestValue = (list, data) => {
  const chartData = deepClone(latestConfig)
  if (list.length === 0 && data.length === 0) return chartData
  data.forEach(item => {
    let temp
    switch (item.device_id) {
      // 湿度
      case list.find(item => item.classId === 16)?.id:
        temp = chartData.find(item => item.id === 16)
        temp.x.push(item.happen_time)
        temp.y.push(JSON.parse(item.value).value)
        break
      // 温度
      case list.find(item => item.classId === 15)?.id:
        temp = chartData.find(item => item.id === 15)
        temp.x.push(item.happen_time)
        temp.y.push(JSON.parse(item.value).value)
        break
      // 光照
      case list.find(item => item.classId === 14)?.id:
        temp = chartData.find(item => item.id === 14)
        temp.x.push(item.happen_time)
        temp.y.push(JSON.parse(item.value).value)
        break
      // 燃气检测
      case list.find(item => item.classId === 3)?.id:
        temp = chartData.find(item => item.id === 3)
        temp.x.push(item.happen_time)
        temp.y.push(JSON.parse(item.value).value)
        break
      // 人体感应
      case list.find(item => item.classId === 5)?.id:
        temp = chartData.find(item => item.id === 5)
        temp.x.push(item.happen_time)
        temp.y.push(JSON.parse(item.value).value)
        break
      // 烟雾感应
      case list.find(item => item.classId === 2)?.id:
        temp = chartData.find(item => item.id === 2)
        temp.x.push(item.happen_time)
        temp.y.push(JSON.parse(item.value).value)
        break
      // 红外警戒
      case list.find(item => item.classId === 4)?.id:
        temp = chartData.find(item => item.id === 4)
        temp.x.push(item.happen_time)
        temp.y.push(JSON.parse(item.value).value)
        break
      default:
        break
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
