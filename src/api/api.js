// 测试地址
// const basicUrl = `http://192.168.31.183:9000/api/v1`
// export const getMqttConfig = {
//   ip: '192.168.31.120',
//   port: 61614,
//   clientId: 'mqttjs_' + Math.random().toString(16).substr(2, 8),
// }

// 发布地址
const basicUrl = `/api`
export const getMqttConfig = {
  ip: `${window.location.hostname}`,
  port: 61614,
  clientId: 'mqttjs_' + Math.random().toString(16).substr(2, 8)
}

// 获取场景 id
export const getSceneId = () => {
  return {
    family: 1,
    hotel: 3,
    park: 4,
    education: 2,
  }
}

// 获取 token
export const getUserToken = () => {
  const user = JSON.parse(localStorage.getItem('userInfo'))
    ? JSON.parse(localStorage.getItem('userInfo')).user
    : ''
  return user
}

// 获取权限
export const getUserRole = () => {
  const role = JSON.parse(localStorage.getItem('userInfo'))
    ? JSON.parse(localStorage.getItem('userInfo')).role
    : ''
  return role
}

// 获取用户 id
export const getUserName = () => {
  const name = JSON.parse(localStorage.getItem('userInfo'))
    ? JSON.parse(localStorage.getItem('userInfo')).name
    : ''
  return name
}

// 获取场景列表
export const getDevicesListUrl = () => {
  return `${basicUrl}/devices/list`
}

// 获取设备历史数据
export const getLatestDataUrl = () => {
  return `${basicUrl}/devices/data`
}

// 提交操作
export const getDevicesControllerUrl = () => {
  return `${basicUrl}/devices/control`
}

// 切换场景
export const getChangeSceneUrl = () => {
  return `${basicUrl}/smartScene/switch`
}

// 注册
export const getRegisterUrl = () => {
  return `${basicUrl}/identity/register`
}

// 删除
export const getDeleteUrl = () => {
  return `${basicUrl}/identity/delete`
}

// 用户登录
export const getUserLoginUrl = id => {
  return `${basicUrl}/login`
}

// 获取用户列表
export const getUserListUrl = () => {
  return `${basicUrl}/user/admin/infoList`
}

// 新增用户
export const getAddUserUrl = () => {
  return `${basicUrl}/register`
}

// 删除用户
export const getDelUserUrl = id => {
  return `${basicUrl}/user/${id}`
}

// 获取网关信息
export const getGatewayUrl = () => {
  return `${basicUrl}/devices/gateway`
}

// 摄像头推流
export const pushCameraUrl = id => {
  return `${basicUrl}/camera/push/${id}`
}

// 摄像头列表
export const getCameraListUrl = () => {
  return `${basicUrl}/camera/list`
}

// 更新摄像头信息
export const getUpdateCameraInfo = () => {
  return `${basicUrl}/camera/add`
}

// 删除摄像头信息
export const getDeleteCameraUrl = id => {
  return `${basicUrl}/camera/${id}`
}

// 摄像头绑定用户
export const getBindUserUrl = _ => {
  return `${basicUrl}/camera/bind`
}

// 获取学校列表
export const getSchoolListUrl = () => {
  return `${basicUrl}/user/admin/organizations`
}

// 新增学校信息
export const addSchoolListUrl = () => {
  return `${basicUrl}/user/admin/addOrganization`
}

// 删除学校信息
export const delSchoolListUrl = id => {
  return `${basicUrl}/user/admin/organization/${id}`
}
