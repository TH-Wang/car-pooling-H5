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
import station from './station'
import unsubscribe from './unsubscribe'
import like from './like'

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
export const queryPositionByCountyName = position.queryPositionByCountyName

// 订单模块
export const getCar = order.getCar
export const queryPassengerOrders = order.queryPassengerOrders
export const getCommonRoute = order.getCommonRoute
export const getPassengerCommonRoute = order.getPassengerCommonRoute
export const getNewPassengerCommonRoute = order.getNewPassengerCommonRoute
export const getFastLineCar = order.getFastLineCar
export const getFastLinePassengerCar = order.getFastLinePassengerCar
export const commitOrder = order.commitOrder
export const getOrdering = order.getOrdering
export const queryByOrderId = order.queryByOrderId
export const confirmOrder = order.confirmOrder
export const getPublishDetail = order.getPublishDetail
export const getPassengerPublishDetail = order.getPassengerPublishDetail
export const driverOrder = order.driverOrder
export const appointmentPassenger = order.appointmentPassenger

// 发布订单模块
export const insertPublish = publish.insertPublish
export const inesrtPublishPassenger = publish.inesrtPublishPassenger
export const queryPublish = publish.queryPublish
export const queryPublishById = publish.queryPublishById
export const updatePublish = publish.updatePublish
export const noSeatNum = publish.noSeatNum
export const latestDriverPublish = publish.latestDriverPublish
export const latestPublishByUser = publish.latestPublishByUser

// 消息模块
export const queryUserMessage = message.queryUserMessage

// 拼车群模块
export const selectGroup = group.selectGroup
export const selectGroupById = group.selectGroupById
export const addGroup = group.addGroup

// 我的行程模块
export const selectMyPassenger = myJourney.selectMyPassenger
export const selectByPassengerDriverDetail = myJourney.selectByPassengerDriverDetail
export const selectMyJourney = myJourney.selectMyJourney
export const selectByPassengerDetail = myJourney.selectByPassengerDetail
export const deleteJourneyById = myJourney.deleteJourneyById

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

// 站长模块
export const postApplication = station.postApplication

// 退订板块
export const selectUnsubscribeReason = unsubscribe.selectUnsubscribeReason

// 点赞模块
export const commitLike = like.commitLike
