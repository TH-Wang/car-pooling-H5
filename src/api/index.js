import user from './user'
import account from './account'
import position from './position'
import order from './order'
import publish from './publish'
import message from './message'
import group from './group'
import myJourney from './myJourney'
import file from './file'
import verification from './verification'
import complaint from './complaint'

// 用户、登录模块
export const sendCode = user.sendCode
export const userCodeLogin = user.userCodeLogin
export const getUserDetail = user.getUserDetail
export const updateUserInfo = user.updateUserInfo
export const updatePhoneToOne = user.updatePhoneToOne
export const updatePhoneToTwo = user.updatePhoneToTwo

// 账户模块
export const selectAccountInfo = account.selectAccountInfo

// 城市信息模块
export const queryPositionForCity = position.queryPositionForCity
export const queryPositionForCounty = position.queryPositionForCounty
export const savePosition = position.savePosition
export const queryPositionByCityName = position.queryPositionByCityName

// 订单模块
export const getCar = order.getCar
export const getCommonRoute = order.getCommonRoute
export const commitOrder = order.commitOrder
export const getOrdering = order.getOrdering
export const queryByOrderId = order.queryByOrderId
export const confirmOrder = order.confirmOrder
export const getPublishDetail = order.getPublishDetail
export const driverOrder = order.driverOrder

// 发布订单模块
export const insertPublish = publish.insertPublish

// 消息模块
export const queryUserMessage = message.queryUserMessage

// 拼车群模块
export const selectGroup = group.selectGroup
export const selectGroupById = group.selectGroupById
export const addGroup = group.addGroup

// 我的行程模块
export const queryAllJourney = myJourney.queryAllJourney

// 上传文件模块
export const uploadFile = file.uploadFile

// 认证模块
export const userIdentityCard = verification.userIdentityCard
export const userDrivingCard = verification.userDrivingCard
export const userCarVerification = verification.userCarVerification
export const userCarDetail = verification.userCarDetail

// 投诉模块
export const addComplaint = complaint.addComplaint
export const userComplaintDetail = complaint.userComplaintDetail
