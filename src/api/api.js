
// const basicUrl = `http://192.168.1.198:9003/api/v1`
// const basicUrl = `http://192.168.1.129:9003/api/v1`
const basicUrl = `http://marswon.gicp.net/api/v1`



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
  const user = JSON.parse(localStorage.getItem('userInfo')) ? JSON.parse(localStorage.getItem('userInfo')).user : ''
  return user
}

// 获取权限
export const getUserRole = () => {
  const role = JSON.parse(localStorage.getItem('userInfo')) ? JSON.parse(localStorage.getItem('userInfo')).role : ''
  return role
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

// 摄像头推流
export const pushCameraUrl = (id) => {
  return `${basicUrl}/camera/push/${id}`
}

// 用户登录
export const getUserLoginUrl = (id) => {
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
export const getDelUserUrl = (id) => {
  return `${basicUrl}/user/${id}`
}