/**
 * ajax请求函数
 * 返回值： promise对象(异步返回的数据是resopnse.data)
 */
import axios from 'axios';
export default function ajax (url, data={}, type='GET') {
    return new Promise(function (resolve, reject) {
        // 执行异步ajax请求 -- 用axios
        let promise
        if (type === 'GET') {
            // 准备url
            let dataStr = ''
            Object.keys(data).forEach(key => {
                dataStr += key + '=' + data[key] + '&'
            })
            if (dataStr !== '') {
                dataStr = dataStr.substring(0, dataStr.lastIndexOf('&'))
                url = url + '?' + dataStr
            }
            // 发送get请求
            promise = axios.get(url) // 返回的是response，不想要response，想要data，所以封装一个promise
        } else {
            // 发送post请求
            promise = axios.post(url, data)
        }
        promise.then(function (resopnse) {
            resolve(resopnse.data)
        })
        .catch(function (error) {
            reject(error)
        })
        // 成功了调用resolve()
        // 失败了调用reject()
    })
    /*let promise
    if (type === 'GET') {
        // 准备url
        let dataStr = ''
        Object.keys(data).forEach(key => {
            dataStr += key + '=' + data[key] + '&'
        })
        if (dataStr !== '') {
            dataStr = dataStr.substring(0, dataStr.lastIndexOf('&'))
            url = url + '?' + dataStr
        }
        // 发送get请求
        promise = axios.get(url) // 返回的是response，不想要response，想要data，所以封装一个promise
    } else {
        // 发送post请求
        promise = axios.post(url, data)
    }
    return promise*/
}

/*const resopnse = await ajax()
const result = resonpe.data

const resule = await ajax()
*/