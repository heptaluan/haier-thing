
const basicUrl = `http://192.168.1.198:9003/api/v1`

// 获取场景列表
export const getDevicesListUrl = () => {
  return `${basicUrl}/devices/list`
}

// 获取设备历史数据
export const getLatestDataUrl = () => {
  return `${basicUrl}/devices/data`
}