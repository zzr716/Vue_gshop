/*
直接更新state的多个方法对象
*/
import {
    RECEIVE_ADDRESS,
    RECEIVE_CATEGORYS,
    RECEIVE_SHOPS,
    RECEIVE_USER_INFO,
    RESET_USER_INFO,
    RECEIVE_GOODS,
    RECEIVE_RATINGS,
    RECEIVE_INFO,
    INCREMENT_FOOD_COUNT,
    DECREMENT_FOOD_COUNT
} from './mutation-types'

import Vue from 'vue'

export default {
    [RECEIVE_ADDRESS] (state, {address}) {
        state.address = address
    },
    [RECEIVE_CATEGORYS] (state, {categorys}) {
        state.categorys = categorys
    },
    [RECEIVE_SHOPS] (state, {shops}) {
        state.shops = shops
    },
    [RECEIVE_USER_INFO] (state, {userInfo}) {
        state.userInfo = userInfo
    },
    [RESET_USER_INFO] (state) {
        state.userInfo = {}
    },
    [RECEIVE_GOODS] (state, {goods}) {
        state.goods = goods
    },
    [RECEIVE_RATINGS] (state, {ratings}) {
        state.ratings = ratings
    },
    [RECEIVE_INFO] (state, {info}) {
        state.info = info
    },
    [INCREMENT_FOOD_COUNT] (state, {food}) {
        // food.count++
        if(!food.count) { // 第一次增加
            // food.count = 1 //新增属性（没有数据绑定）
            /**
             * 对象
             * 属性名
             * 属性值
             */
            Vue.set(food, 'count', 1) //让新增的属性也有数据绑定
            // 将food加到cartFood中
            state.cartFoods.push(food)
        } else {
            food.count++
        }
    },
    [DECREMENT_FOOD_COUNT] (state, {food}) {
        if(food.count) {
            food.count--
            if(food.count===0) {
                // 将food从cartFoods中移除
                state.cartFoods.splice(state.cartFoods.indexOf(food), 1)
            }
        }
    }
}