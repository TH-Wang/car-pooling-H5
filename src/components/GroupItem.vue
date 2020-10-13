<template>
  <div class="group-container" @click="$emit('click', {id: record.id})">

    <!-- 头像 -->
    <div class="avatar"></div>

    <!-- 信息 -->
    <div class="info">
      <!-- 主要信息 -->
      <div class="info-main">
        <div v-if="type === 'group'" :class="tagClass">{{tagText}}</div>
        <div class="group-name">{{record.name}}</div>
      </div>
      <!-- 群人数 -->
      <div v-if="type === 'group'" class="people">
        <van-icon name="friends"/>
        <span class="people-count">{{record.people}}</span>
      </div>
      <!-- 个人微信号 -->
      <div v-else-if="type=== 'person'" class="wechat-number">{{record.wechat_number}}</div>
    </div>

    <!-- 价格 -->
    <div class="right-slot">
      <slot name="right" />
    </div>
  </div>
</template>

<script>
import { Icon } from 'vant'

export default {
  components: {
    'van-icon': Icon
  },
  props: {
    record: {
      type: Object,
      default: () => ({})
    },
    // ['person', 'group'] 是群名片还是个人联系名片
    type: {
      type: String,
      default: 'group'
    }
  },
  computed: {
    tagClass () {
      return `tag-${this.record.type === 0 ? 'blue' : 'green'}`
    },
    tagText () {
      return this.record.type === 0 ? '入驻群' : '官方群'
    }
  }
}
</script>

<style lang="scss" scoped>
.group-container{
  padding: 0 .15rem;
  padding-bottom: .20rem;
  box-sizing: border-box;
  @include flex (space-between, center);

  // 头像
  .avatar{
    flex-shrink: 0;
    width: 0.6rem;
    height: 0.6rem;
    border-radius: .08rem;
    background-color: $normal-text;
  }

  // 信息
  .info{
    flex: 1;
    margin: 0 .15rem;

    &-main{
      @include flex (flex-start, center);
      margin-bottom: 0.05rem;

      .tag{
        flex-shrink: 0;
        padding: 0rem .04rem;
        margin-right: .06rem;
        border-radius: .06rem .02rem;
        @include font (.10rem, #ffffff, 100);

        &-blue{
          @extend .tag;
          background-color: $aid-blue-color;
        }

        &-green{
          @extend .tag;
          background-color: $aid-green-color;
        }
      }

      .group-name{
        flex: 1;
        @include font (.16rem, $main-text, bold);
      }
    }

    .people{
      @include font (.11rem, $sub-text);
      @include flex ($align: center);

      &-count{
        margin-left: 0.03rem;
      }
    }

    .wechat-number{
      @include font (.11rem, $sub-text);
    }
  }

  // 价格
  .right-slot{
    flex-shrink: 0;
  }
}
</style>
