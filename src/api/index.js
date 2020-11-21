import user from './user'
import position from './position'
import order from './order'
import publish from './publish'

// 用户、登录模块
export const sendCode = user.sendCode
export const userCodeLogin = user.userCodeLogin

// 城市信息模块
export const queryPositionForCity = position.queryPositionForCity
export const queryPositionForCounty = position.queryPositionForCounty

// 查询订单模块
export const getCar = order.getCar
export const getCommonRoute = order.getCommonRoute

// 发布订单模块
export const insertPublish = publish.insertPublish
