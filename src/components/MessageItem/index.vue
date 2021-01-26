<template>
  <div class="notify-container">
    <!-- 时间 -->
    <div class="time">{{record.time | time}}</div>
    <!-- 详情卡片 -->
    <div class="card" @click="handleLink($event, record.orderId)">
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
          <p><span>乘客姓名：</span>{{record.userName}}</p>
          <p><span>联系电话：</span>{{record.telPhone}}</p>
        </template>
        <template v-if="confirm.customer.people">
          <p><span>订座人数：</span>{{record.orderNum}}</p>
          <p><span>行程起点：</span>{{record.passPointList | point('start')}}</p>
          <p><span>行程终点：</span>{{record.passPointList | point('end')}}</p>
          <p><span>乘客备注：</span>{{record.remark}}</p>
        </template>
        <template v-if="confirm.customer.cancel">
          <p><span>取消时间：</span></p>
          <p><span>当前余座：</span>{{record.num}}</p>
        </template>
        <!-- 车主发布的信息 -->
        <template v-if="type === 6">
          <p><span>班车线路：</span>{{line}}</p>
          <p><span>车辆途径：</span>{{middle}}</p>
          <p><span>手机号码：</span>{{record.mobilePhone}}</p>
          <p><span>出发时间：</span>{{record.startTime | datetime}}</p>
          <p><span>发布座位：</span>{{record.seatNum}}</p>
          <p><span>拼车备注：</span>{{record.remark | hasEmpty}}</p>
        </template>
      </div>

      <!-- 我是乘客展示的信息 -->
      <div class="card-content" v-if="!confirm.isDriverMsg">
        <!-- 乘客发布的信息 -->
        <template v-if="type === 7">
          <p><span>班车线路：</span>{{line}}</p>
          <p><span>起点终点：</span>{{middle}}</p>
          <p><span>手机号码：</span>{{record.mobilePhone}}</p>
          <p><span>出发时间：</span>{{record.startTime | datetime}}</p>
          <p><span>乘车人数：</span>{{record.seatNum}}</p>
          <p><span>拼车备注：</span>{{record.remark | hasEmpty}}</p>
        </template>
        <!-- 预约车主的信息 -->
        <template v-if="confirm.driver.name">
          <p><span>车主姓名：</span>{{record.userName}}</p>
          <p><span>车辆型号：</span>{{record.userName}}</p>
        </template>
        <template v-if="confirm.driver.detail">
          <p><span>该车余座：</span>{{record.userName}}</p>
          <p><span>手机号码：</span>{{record.mobilePhone}}</p>
          <p><span>班车线路：</span>{{record.mobilePhone}}</p>
          <p><span>车辆途径：</span>{{record.mobilePhone}}</p>
          <p><span>车主备注：</span>{{record.mobilePhone}}</p>
        </template>
        <template v-if="confirm.driver.cancel">
          <p><span>联系电话：</span></p>
          <p><span>当前余座：</span>{{record.num}}</p>
        </template>
      </div>
      <div class="card-link">查看行程详情</div>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
import titleConfig from './titleConfig'
import confirm from './confirm'
import line from './line'

export default {
  props: {
    record: {
      type: Object,
      default: () => ({})
    },
    user: Object,
    type: Number
  },
  data: () => ({
    titleConfig
  }),
  computed: {
    // 标题
    title () {
      return this.titleConfig[this.type]
    },
    // 描述信息
    desc () {
      const { username } = this.user
      if (this.confirm.isDriverMsg) {
        return `${username}，您的车辆 行程已经发布成功`
      }
      return ''
    },
    // 显示信息判断
    confirm () {
      return confirm(this.type)
    },
    // 车主发布的班车线路
    line () {
      return line(this.record.passPointList)
    },
    // 车主发布的途径点
    middle () {
      return this.record.passPointList.map(i => i.pointName).join('-')
    }
  },
  filters: {
    time: value => moment(value).format('YYYY-MM-DD HH:mm'),
    datetime: value => moment(value).format('MM月DD日 HH:mm'),
    hasEmpty: value => value || '无',
    point: (list, type) => {
      if (type === 'start') return list.find(i => i.type === 1).pointName
      else if (type === 'end') return list.find(i => i.type === 3).pointName
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

    &-desc, &-content{
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

    &-link{
      @include font (.12rem, $main-color);
      margin-left: .25rem;
      padding-bottom: 3px;
      display: inline-block;
      border-bottom: solid 1px $main-color;
    }
  }
}
</style>
