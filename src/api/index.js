import ajax from "./ajax";

/**
 *  包含n个接口请求函数的模块
 * 函数的返回值：promise对象
 */
// export function reqAddress (geohash) {}
export const reqAddress = (geohash) => ajax(`/position/${geohash}`)
export const reqFoodTypes = () => ajax('/index_category')
export const reqShops = (longitude, latitude) => ajax('/shops', {longitude, latitude})
