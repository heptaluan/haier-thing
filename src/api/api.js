
const basicUrl = `http://192.168.1.198:9003/api/v1`

// 获取场景列表
export const getDevicesList = () => {
  return `${basicUrl}/devices/list`
}