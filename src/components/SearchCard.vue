<template>
  <div class="container">
    <!-- 上方搜索栏 -->
    <div class="search-box">
      <!-- 指示图标 -->
      <div class="guide-box">
        <img class="point" src="@/assets/icons/start-point.png" alt="">
        <!-- 转换起止点按钮 -->
        <img v-if="defaultType" class="switch"
          src="@/assets/icons/switch.png" alt=""
          @click="handleSwitchPos">
        <img class="point" src="@/assets/icons/end-point.png" alt="">
      </div>
      <!-- 地址显示栏 -->
      <div class="address-box">
        <!-- 起始点 -->
        <div class="address-bar dotted-border">
          <input
            :value="isCommon ? search.startAddr.name : release.startAddr.name"
            @input="handleChange($event, 'startAddr')"
            @click="handleLinkPos($event, 'start')"
            class="address-bar-input"
            type="text"
            placeholder="请输入起点"
            readonly
          >
          <!-- <van-switch
            v-if="defaultType"
            v-model="startSwtich"
            active-color="#FFCD00"
            size="0.16rem"
          /> -->
        </div>
        <!-- 目的地 -->
        <div class="address-bar">
          <input
            :value="isCommon ? search.endAddr.name : release.endAddr.name"
            @input="handleChange($event, 'endAddr')"
            @click="handleLinkPos($event, 'end')"
            class="address-bar-input"
            type="text"
            placeholder="您要去哪儿  地址/街道/酒店/景点"
            readonly
          >
          <!-- <van-switch
            v-if="defaultType"
            v-model="startSwtich"
            active-color="#FFCD00"
            size="0.16rem"
          /> -->
        </div>
      </div>
      <!-- 右侧切换按钮 -->
      <div v-if="!defaultType" class="switch-button" @click="handleSwitchPos">
        <img src="@/assets/icons/switch.png" alt="">
      </div>
    </div>

    <!-- 按钮 -->
    <div class="button" v-if="hasButton">
      <main-button
        width="100%"
        :color="buttonColor"
        :type="buttonType"
        @click="handleSearch"
      >{{buttonText}}</main-button>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex'
// import { Switch } from 'vant'
import { isEmpty, cloneDeep } from 'lodash'
import MainButton from '@/components/MainButton'

export default {
  components: {
    // 'van-switch': Switch,
    'main-button': MainButton
  },
  model: {
    prop: 'value',
    event: 'change'
  },
  props: {
    // 搜索类型 common: 公用，release: 发布页面
    searchType: {
      type: String,
      default: 'common'
    },
    // ['default', 'icon-right']
    type: {
      type: String,
      default: 'default'
    },
    // 输入值
    value: {
      type: Object,
      default: () => ({
        startAddr: '',
        endAddr: ''
      })
    },
    // 是否使用 store 中缓存的起止点信息
    useStore: {
      type: Boolean,
      default: true
    },
    // 下部分均与搜索按钮相关
    hasButton: {
      type: Boolean,
      default: true
    },
    buttonText: {
      type: String,
      default: '寻找车主'
    },
    buttonColor: {
      type: String,
      default: 'yellow'
    },
    buttonType: {
      type: String,
      default: 'fill'
    }
  },
  computed: {
    ...mapState(['search', 'release']),
    defaultType () {
      return this.type === 'default'
    },
    // 是否是公用类型
    isCommon () {
      return this.searchType === 'common'
    }
  },
  data: () => ({
    startSwtich: false
  }),
  methods: {
    ...mapMutations(['setSearchAddr']),
    // 输入框发送变化
    handleChange (e, type) {
      const value = e.target.value
      if (this.useStore) {
        // 如果使用缓存，则修改缓存中的数据
        this.setSearchAddr({ type, value })
      } else {
        // 使用双向绑定
        const position = cloneDeep(this.value)
        position[type] = value
        this.$emit('change', position)
      }
    },
    // 点击地址输入框
    handleLinkPos (e, type) {
      this.$router.push(`/common/search/pos/${type}?type=${this.searchType}`)
    },
    // 点击搜索按钮
    handleSearch () {
      if (this.validate()) { this.$emit('search') }
    },
    // 切换起止点位置
    handleSwitchPos () {
      const commitType = this.isCommon ? 'switchSearchAddr' : 'switchReleaseAddr'
      this.$store.commit(commitType)
    },
    validate () {
      const value = this.useStore ? this.search : this.value
      const { startAddr, endAddr } = value
      if (isEmpty(startAddr)) {
        this.$toast({ message: '请先输入您的位置' })
        return false
      }
      if (isEmpty(endAddr)) {
        this.$toast({ message: '请输入您要去哪' })
        return false
      }
      return true
    }
  }
}
</script>

<style lang="scss" scoped>
.container{
  width: 3.45rem;
  margin: 0 auto;
  padding: 0 .18rem;
  box-shadow: 0px 0px 10px 4px rgba(38, 38, 38, 0.06);
  box-sizing: border-box;
  border-radius: 0.05rem;
  background-color: #fff;

  // 上方搜索容器
  .search-box{
    display: flex;
    align-items: center;

    // 指示图标容器
    .guide-box{
      flex-shrink: 0;
      height: .70rem;
      padding: 0rem 0.12rem 0rem 0.05rem;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: center;

      .point{
        width: 0.14rem;
        height: 0.14rem;
      }

      .switch{
        width: 0.18rem;
        height: 0.18rem;
        // margin: 0.12rem 0;
      }
    }

    // 地址栏容器
    .address-box{
      flex: 1;

      .address-bar{
        height: 0.55rem;
        display: flex;
        align-items: center;
        font-size: 0.14rem;
        color: $main-text;
        font-weight: bold;

        &-input{
          display: block;
          flex: 1;
          border: none;
          height: 100%;
        }

        &-city{
          flex-shrink: 0;
          margin-right: 0.12rem;
        }

        &-detail{
          flex: 1;
          margin-right: 0.08rem;
          text-align: left;
        }

        // placeholder
        .default{
          color: $tip-text;
          font-weight: 400;
        }
      }

      // 虚线边框
      .dotted-border{
        border-bottom: dashed 1px $normal-text;
      }
    }

    // 右侧切换按钮
    .switch-button{
      width: .40rem;
      height: 0.4rem;
      border-radius: .05rem;
      background-color: $linecard-color;
      margin-left: .10rem;
      @include flex (center, center);

      img{
        width: .20rem;
        height: .20rem;
        transform: translateY(-1px);
      }
    }
  }

  // 按钮
  .button{
    padding-bottom: .15rem;
  }
}

</style>
