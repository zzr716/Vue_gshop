import ajax from "./ajax";
// const BASE_URL = 'http://localhost:4000'
const BASE_URL = '/api'

/**
 *  包含n个接口请求函数的模块
 * 函数的返回值：promise对象
 */
// export function reqAddress (geohash) {}
export const reqAddress = (geohash) => ajax(BASE_URL + `/position/${geohash}`)
export const reqFoodCategorys = () => ajax(BASE_URL + '/index_category')
export const reqShops = (longitude, latitude) => ajax(BASE_URL + '/shops', {longitude, latitude})
export const reqSearchShop = (geohash, keyword) => ajax(BASE_URL+'/search_shops', {geohash, keyword})
export const reqPwdLogin = ({name, pwd, captcha}) => ajax(BASE_URL+'/login_pwd', {name, pwd, captcha}, 'POST')
export const reqSendCode = (phone) => ajax(BASE_URL + '/sendcode', {phone})
export const reqSmsLogin = (phone, code) => ajax(BASE_URL + '/login_sms', {phone, code})
export const reqUserInfo = () => ajax(BASE_URL + '/userinfo')
export const reqLogout = () => ajax(BASE_URL+'/logout')

/**
 * 获取商家信息
 */
export const reqShopInfo = () => ajax('/info')

/**
 * 获取商家评价数组
 */
export const reqShopRatings = () => ajax('/ratings')

/**
 * 获取商家商品数组
 */
export const reqShopGoods = () => ajax('/goods')
