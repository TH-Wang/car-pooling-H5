<template>
  <div class="notify-container">
    <!-- 时间 -->
    <div class="time">{{record.time | time}}</div>
    <!-- 详情卡片 -->
    <div class="card" @click="handleLink">
      <!-- 标题 -->
      <div class="card-header">
        <img src="@/assets/icons/notify.png" alt="">
        <div v-html="title" />
      </div>
      <!-- 描述 -->
      <div class="card-desc">{{desc}}</div>
      <!-- 我是车主展示的信息 -->
      <div class="card-content" v-if="confirm.isDriverMsg">
        <!-- 预约乘客的信息 -->
        <template v-if="confirm.customer.name">
          <p><span>乘客姓名：</span>{{record.order.userName}}</p>
          <p><span>联系电话：</span>{{record.order.telPhone | phone}}</p>
        </template>
        <template v-if="confirm.customer.people">
          <p><span>订座人数：</span>{{record.order.orderNum}}</p>
          <p><span>行程起点：</span>{{record.order.passPointList | point('start')}}</p>
          <p><span>行程终点：</span>{{record.order.passPointList | point('end')}}</p>
          <p><span>乘客备注：</span>{{record.order.remark | hasEmpty}}</p>
        </template>
        <template v-if="confirm.customer.cancel">
          <p><span>取消时间：</span>{{record.order.updateTime | datetime}}</p>
          <p><span>当前余座：</span>{{record.publish.num}}</p>
        </template>
        <!-- 车主发布的信息 -->
        <template v-if="record.type === 6">
          <p><span>班车线路：</span>{{record.publish.passPointList | line}}</p>
          <p><span>车辆途径：</span>{{record.publish.passPointList | middle}}</p>
          <p><span>手机号码：</span>{{record.publish.mobilePhone | phone}}</p>
          <p><span>出发时间：</span>{{record.publish.startTime | datetime}}</p>
          <p><span>发布座位：</span>{{record.publish.num}}</p>
          <p><span>拼车备注：</span>{{record.publish.remark | hasEmpty}}</p>
        </template>
      </div>

      <!-- 我是乘客展示的信息 -->
      <div class="card-content" v-if="!confirm.isDriverMsg">
        <!-- 乘客发布的信息 -->
        <template v-if="record.type === 7">
          <p><span>班车线路：</span>{{record.order.passPointList | line}}</p>
          <p><span>起点终点：</span>{{record.order.passPointList | middle}}</p>
          <p><span>手机号码：</span>{{record.order.telPhone | phone}}</p>
          <p><span>出发时间：</span>{{record.order.passengerStartTime | datetime}}</p>
          <p><span>乘车人数：</span>{{record.order.orderNum}}</p>
          <p><span>拼车备注：</span>{{record.order.remark | hasEmpty}}</p>
        </template>
        <!-- 预约车主的信息 -->
        <template v-if="confirm.driver.name">
          <p><span>车主姓名：</span>{{record.publish.userName}}</p>
          <p><span>车辆型号：</span>{{record.publish.vehicleTypeName}}</p>
        </template>
        <template v-if="confirm.driver.detail">
          <p><span>该车余座：</span>{{record.publish.num}}</p>
          <p><span>手机号码：</span>{{record.publish.mobilePhone | phone}}</p>
          <p><span>班车线路：</span>{{record.publish.passPointList | line}}</p>
          <p><span>车辆途径：</span>{{record.publish.passPointList | middle}}</p>
          <p><span>车主备注：</span>{{record.publish.remark | hasEmpty}}</p>
        </template>
        <template v-if="confirm.driver.cancel">
          <p><span>联系电话：</span>{{record.publish.mobilePhone | phone}}</p>
          <p><span>当前余座：</span>{{record.publish.num}}</p>
        </template>
      </div>

      <!-- 温馨提示 -->
      <div class="card-tips">
        <p>温馨提示：</p>
        <p v-for="(item, index) in tipConfig[record.type]" :key="index">{{item}}</p>
      </div>
      <div class="card-link">查看行程详情</div>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
import titleConfig from './titleConfig'
import descConfig from './descConfig'
import tipConfig from './tipConfig'
import confirm from './confirm'
import line from './line'

export default {
  props: {
    record: {
      type: Object,
      default: () => ({})
    }
  },
  data: () => ({
    titleConfig,
    descConfig,
    tipConfig
  }),
  computed: {
    // 标题
    title () {
      return this.titleConfig[this.record.type]
    },
    // 描述信息
    desc () {
      const { username } = this.record.user
      if (this.confirm.isDriverMsg) {
        // const car = this.record.vehicleTypeName || ''
        // return `${username}，您的车辆${car}${this.descConfig[this.record.type]}`
        return `${username}，${this.descConfig[this.record.type]}`
      }
      return `${username}，${this.descConfig[this.record.type]}`
    },
    // 显示信息判断
    confirm () {
      return confirm(this.record.type)
    }
  },
  filters: {
    time: value => moment(value).format('YYYY-MM-DD HH:mm'),
    datetime: value => (value ? moment(value).format('MM月DD日 HH:mm') : ''),
    hasEmpty: value => value || '无',
    // 班车线路
    line: value => line(value),
    // 途径点
    middle: value => value.map(i => i.pointName).join('-'),
    // 起点终点
    point: (list, type) => {
      if (type === 'start') return list.find(i => i.type === 1).pointName
      else if (type === 'end') return list.find(i => i.type === 3).pointName
    },
    // 过滤电话
    phone: value => `${value.slice(0, 3)}****${value.slice(7)}`
  },
  methods: {
    handleLink () {
      let url = null
      if (this.confirm.isDriverMsg) {
        url = '/common/tripinfo/driver?id=' + this.record.publish.pprId
      } else url = '/common/tripinfo/customer?id=' + this.record.order.orderId
      this.$router.push(url)
    }
  }
}
</script>

<style lang="scss" scoped>
.notify-container{
  margin: .20rem 0;
  padding: 0 .15rem;
  box-sizing: border-box;

  .time{
    @include font (.12rem, $tip-text);
    margin-bottom: .10rem;
    text-align: center;
  }

  .card{
    width: 100%;
    padding: .10rem .10rem .20rem .15rem;
    box-sizing: border-box;
    border-radius: .05rem;
    background-color: $light-color;

    &-header{
      @include flex ($align: center);
      @include font (.15rem, $main-text, bold);
      // margin-bottom: .15rem;

      img{
        width: 0.2rem;
        height: 0.2rem;
        margin-right: .05rem;
        flex-shrink: 0;
      }

      div span{
        color: $main-color;
      }
    }

    &-desc, &-content, &-tips{
      padding-left: .25rem;
    }

    &-desc{
      @include font (.12rem, $sub-text);
      margin: .05rem 0 .15rem;
    }

    &-content{
      @include font (.14rem, $main-text);
      margin: .06rem 0 .16rem 0;

      p{
        margin-bottom: .05rem;

        span{
          width: .7rem;
          color: $tip-text;
        }
      }
    }

    &-tips{
      @include font (.13rem, $sub-text);
    }

    &-link{
      @include font (.12rem, $main-color);
      margin-left: .25rem;
      margin-top: .10rem;
      padding-bottom: 3px;
      display: inline-block;
      border-bottom: solid 1px $main-color;
    }
  }
}
</style>
