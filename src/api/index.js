import user from './user'
import account from './account'
import position from './position'
import order from './order'
import publish from './publish'
import message from './message'

// 用户、登录模块
export const sendCode = user.sendCode
export const userCodeLogin = user.userCodeLogin

// 账户模块
export const selectAccountInfo = account.selectAccountInfo

// 城市信息模块
export const queryPositionForCity = position.queryPositionForCity
export const queryPositionForCounty = position.queryPositionForCounty

// 查询订单模块
export const getCar = order.getCar
export const getCommonRoute = order.getCommonRoute

// 发布订单模块
export const insertPublish = publish.insertPublish

// 消息板块
export const queryUserMessage = message.queryUserMessage
