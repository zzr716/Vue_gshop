<template>
  <div>
    <div class="goods">
      <div class="menu-wrapper" ref="menuWrapper">
        <ul>
          <li class="menu-item" v-for="(good, index) in goods" :key="index" @click="clickMenuItem(index)" :class="{current: index===currentIndex}">
            <span class="text bottom-border-1px">
              <img
                class="icon"
                :src="good.icon" v-if="good.icon"
              >
              {{good.name}}
            </span>
          </li>
        </ul>
      </div>
      <div class="foods-wrapper" ref="foodsWrapper">
        <ul ref="foodsUl">
          <li class="food-list-hook" v-for="(good, index) in goods" :key="index">
            <h1 class="title">{{good.name}}</h1>
            <ul>
              <li class="food-item bottom-border-1px" v-for="(food, index) in good.foods" :key="index">
                <div class="icon" @click="ShowFood(food)">
                  <img
                    width="57"
                    height="57"
                    :src="food.icon"
                  >
                </div>
                <div class="content">
                  <h2 class="name">{{food.name}}</h2>
                  <p class="desc">{{food.description}}</p>
                  <div class="extra">
                    <span class="count">月售{{food.sellCount}}份</span>
                    <span>好评率 {{food.rating}}%</span>
                  </div>
                  <div class="price">
                    <span class="now">￥{{food.price}}</span>
                    <span class="old" v-if="food.oldPrice">￥{{food.oldPrice}}</span>
                  </div>
                  <div class="cartcontrol-wrapper">
                    <CartContorl :food="food"/>
                  </div>
                </div>
              </li>
            </ul>
          </li>
          <!-- <li class="food-list food-list-hook">
            <h1 class="title">香浓甜粥</h1>
            <ul>
              <li class="food-item bottom-border-1px">
                <div class="icon">
                  <img
                    width="57"
                    height="57"
                    src="http://fuss10.elemecdn.com/6/72/cb844f0bb60c502c6d5c05e0bddf5jpeg.jpeg?imageView2/1/w/114/h/114">
                </div>
                <div class="content">
                  <h2 class="name">红枣山药粥</h2>
                  <p class="desc">红枣山药糙米粥,素材包</p>
                  <div class="extra">
                    <span class="count">月售17 份</span>
                    <span>好评率 100%</span>
                  </div>
                  <div class="price">
                    <span class="now">￥29</span>
                    <span class="old">￥36</span>
                  </div>
                  <div class="cartcontrol-wrapper">CartControl</div>
                </div>
              </li>
            </ul>
          </li> -->
        </ul>
      </div>
      <ShopCart/>
    </div>
    <Food :food="food" ref="food"/>
  </div>
</template>

<script>
import {mapState} from 'vuex'
import BScroll from 'better-scroll'
import CartContorl from '../../../components/CartContorl/CartContorl.vue'
import Food from '../../../components/Food/Food.vue'
import ShopCart from '../../../components/ShopCart/ShopCart.vue'


export default {
  data () {
    return {
      scrollY: 0, //滑动y
      tops: [], //数组tops（列表第一次显示后就不变化） 【滑动过程中实时收集鼠标y】
      food: {}
    }
  },
  mounted () {
    this.$store.dispatch('getShopGoods', () => {
      this.$nextTick(() => { // 列表数据更新显示后
        this._initScroll()
        this._initTops()
      })
    })
  },
  computed: {
    ...mapState(['goods']),
    // 计算得到当前分类的下标
    currentIndex () {
      // 得到条件
      const {scrollY, tops} = this;
      // 根据条件计算产生一个结果
      const index = tops.findIndex((top, index) => {
        // scrollY>=top[i]&&scrollY<top[i+1]
        return scrollY>=top && scrollY<tops[index+1]
      })
      // 返回结果
      return index
    }
  },
  methods: {
    _initScroll () {
      // 列表显示之后创建
        new BScroll('.menu-wrapper', {
          click: true
        })
        this.foodsScroll = new BScroll('.foods-wrapper', {
          probeType: 2,
          click: true
        })
        this.foodsScroll.on('scroll', ({x, y}) => {
          this.scrollY = Math.abs(y)
        })
        // 滚动结束
        this.foodsScroll.on('scrollEnd', ({x, y}) => {
          this.scrollY = Math.abs(y)
        })
    },
    _initTops () {
      // 初始化
      const tops = [];
      let top = 0;
      tops.push(top);
      // 找所有分类的li
      const lis = this.$refs.foodsUl.getElementsByClassName('food-list-hook')
      Array.prototype.slice.call(lis).forEach(li => {
        top += li.clientHeight
        tops.push(top)
      })
      this.tops = tops
      console.log(tops)
    },
    clickMenuItem (index) {
      // console.log(index)
      // 使用右侧列表滑动到指定位置
      // 得到目标位置
      const y = -this.tops[index]
      // 立即更新scrolly（让点击的分类项成为当前分类
      this.scrollY = y
      // 滑到位置
      this.foodsScroll.scrollTo(0, y, 300)
    },
    // 显示点击的food
    ShowFood (food) {
      // 设置food
      this.food = food
      // 显示food组件(调用子组件对象方法)
      this.$refs.food.toggleShow()
    }
  },
  components: {
    CartContorl,
    Food,
    ShopCart
  }
};
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import '../../../common/stylus/mixins.styl';

.goods {
  display: flex;
  position: absolute;
  top: 195px;
  bottom: 46px;
  width: 100%;
  background: #fff;
  overflow: hidden;

  .menu-wrapper {
    flex: 0 0 80px;
    width: 80px;
    background: #f3f5f7;

    .menu-item {
      display: table;
      height: 54px;
      width: 56px;
      padding: 0 12px;
      line-height: 14px;

      &.current {
        position: relative;
        z-index: 10;
        margin-top: -1px;
        background: #fff;
        color: $green;
        font-weight: 700;

        .text {
          border-none();
        }
      }

      .icon {
        display: inline-block;
        vertical-align: top;
        width: 12px;
        height: 12px;
        margin-right: 2px;
        background-size: 12px 12px;
        background-repeat: no-repeat;
      }

      .text {
        display: table-cell;
        width: 56px;
        vertical-align: middle;
        bottom-border-1px(rgba(7, 17, 27, 0.1));
        font-size: 12px;
      }
    }
  }

  .foods-wrapper {
    flex: 1;

    .title {
      padding-left: 14px;
      height: 26px;
      line-height: 26px;
      border-left: 2px solid #d9dde1;
      font-size: 12px;
      color: rgb(147, 153, 159);
      background: #f3f5f7;
    }

    .food-item {
      display: flex;
      margin: 18px;
      padding-bottom: 18px;
      bottom-border-1px(rgba(7, 17, 27, 0.1));

      &:last-child {
        border-none();
        margin-bottom: 0;
      }

      .icon {
        flex: 0 0 57px;
        margin-right: 10px;
      }

      .content {
        flex: 1;

        .name {
          margin: 2px 0 8px 0;
          height: 14px;
          line-height: 14px;
          font-size: 14px;
          color: rgb(7, 17, 27);
        }

        .desc, .extra {
          line-height: 10px;
          font-size: 10px;
          color: rgb(147, 153, 159);
        }

        .desc {
          line-height: 12px;
          margin-bottom: 8px;
        }

        .extra {
          .count {
            margin-right: 12px;
          }
        }

        .price {
          font-weight: 700;
          line-height: 24px;

          .now {
            margin-right: 8px;
            font-size: 14px;
            color: rgb(240, 20, 20);
          }

          .old {
            text-decoration: line-through;
            font-size: 10px;
            color: rgb(147, 153, 159);
          }
        }

        .cartcontrol-wrapper {
          position: absolute;
          right: 0;
          bottom: 12px;
        }
      }
    }
  }
}
</style>
