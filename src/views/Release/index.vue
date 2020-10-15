<template>
  <div>
    <!-- 导航栏 -->
    <van-nav-bar title="发布" fixed placeholder :border="false" />

    <!-- tabs -->
     <van-tabs
      v-model="tabId"
      color="#262626"
      title-inactive-color="#BFBFBF"
      title-active-color="#262626"
      background="#ffffff"
      line-width="52px"
      line-height="2px"
      animated
    >
      <!-- 车主发布 -->
      <van-tab title="车主发布">

        <!-- 搜索卡片 -->
        <div class="search-card-wrap">
          <search-card :hasButton="false" />
        </div>

        <customer-form></customer-form>

        <div class="submit">
          <div class="submit-checkbox">
            <van-checkbox
              v-model="agreePact"
              icon-size=".15rem"
              checked-color="#FFCD00"
              shape="square"
            >我已阅读并同意发布拼车信息<span class="link">《合乘协议》</span></van-checkbox>
          </div>
          <div class="submit-checkbox">
            <van-checkbox
              v-model="agreePackage"
              icon-size=".15rem"
              checked-color="#FFCD00"
              shape="square"
            >天天拼车套餐，免去天天发布信息（非必选）</van-checkbox>
          </div>
          <main-button center style="margin-top:.22rem">发布</main-button>
          <div class="submit-confirm-phone">
            请确认你的联系手机号
            <span class="phone">157 2020 0126</span>
            <span class="link">修改手机号</span>
          </div>
        </div>

        <!-- 温馨提示 -->
        <div class="tip">
          <p>温馨提示</p>
          <p>请务必保证信息的真实，如被拼友投诉，将被平台限制发信息哦</p>
        </div>
      </van-tab>

      <!-- 乘客发布 -->
      <van-tab title="乘客发布">

        <!-- 搜索卡片 -->
        <div class="search-card-wrap">
          <search-card :hasButton="false" />
        </div>

        <div class="submit">
          <div class="submit-checkbox">
            <van-checkbox
              v-model="agreePact"
              icon-size=".15rem"
              checked-color="#FFCD00"
              shape="square"
            >我已阅读并同意发布拼车信息<span class="link">《合乘协议》</span></van-checkbox>
          </div>
          <div class="submit-checkbox">
            <van-checkbox
              v-model="agreePackage"
              icon-size=".15rem"
              checked-color="#FFCD00"
              shape="square"
            >天天拼车套餐，免去天天发布信息（非必选）</van-checkbox>
          </div>
          <main-button center style="margin-top:.22rem">发布出行信息</main-button>
          <div class="submit-confirm-phone">
            请确认你的联系手机号
            <span class="phone">157 2020 0126</span>
            <span class="link">修改手机号</span>
          </div>
        </div>

        <!-- 温馨提示 -->
        <div class="tip">
          <p>温馨提示</p>
          <p>请务必保证信息的真实，如被拼友投诉，将被平台限制发信息哦</p>
        </div>
      </van-tab>
     </van-tabs>
  </div>
</template>

<script>
import { Tabs, Tab, Checkbox } from 'vant'
import SearchCard from '@/components/SearchCard'
import MainButton from '@/components/MainButton'
import CustomerForm from './customer'

export default {
  components: {
    'van-tabs': Tabs,
    'van-tab': Tab,
    'van-checkbox': Checkbox,
    'search-card': SearchCard,
    'main-button': MainButton,
    'customer-form': CustomerForm
  },
  data: () => ({
    tabId: 0,
    agreePact: true,
    agreePackage: false
  })
}
</script>

<style lang="scss" scoped>
.search-card-wrap{
  padding: .20rem 0;
  border-top: solid 1px $normal-text;
}

.submit{
  padding: 0 .15rem;
  box-sizing: border-box;

  &-checkbox{
    margin-bottom: .15rem;
    @include font (.12rem, $tip-text);
  }

  &-confirm-phone{
    margin-top: .18rem;
    text-align: center;
    @include font (.12rem, $tip-text);

    .phone{
      color: $main-text;
    }

    .link{
      margin-left: .15rem;
    }
  }

  .link{
    color: $main-color;
  }
}

.tip{
  margin: .30rem .15rem;
  @include font (.12rem, $tip-text);
  line-height: .24rem;
}
</style>
