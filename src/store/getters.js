const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.user.token,
  username: state => state.user.userInfo.username,
  userId: state => state.user.userInfo.userId,
  staffPhoto: satte => satte.user.userInfo.staffPhoto,
  hrsaasTime: state => state.user.hrsaasTime
}
export default getters
