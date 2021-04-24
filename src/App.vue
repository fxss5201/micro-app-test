<template>
  <div>
    <el-container>
      <el-aside width="200px">
        <main-menu :menus="menus"></main-menu>
      </el-aside>
      <el-container>
        <el-header>
          <div>Header</div>
          <div class="head-content">
            <span>主应用Action通信:</span>
            <el-divider direction="vertical"></el-divider>
            <span>actionToken: {{ actionToken }}</span>
            <el-divider direction="vertical"></el-divider>
            <el-button size="mini" @click="setMainAtionToken">设置actionToken为mainAtionToken</el-button>
          </div>
          <div class="head-content">
            <span>主应用Action + Vuex通信:</span>
            <el-divider direction="vertical"></el-divider>
            <span>actionVuexToken: {{ actionVuexToken }}</span>
            <el-divider direction="vertical"></el-divider>
            <el-button size="mini" @click="setMainActionVuexToken">设置actionVuexToken为mainActionVuexToken</el-button>
          </div>
        </el-header>
        <el-main>
          <!-- 主应用渲染区，用于挂载主应用路由触发的组件 -->
          <router-view v-show="$route.name" />

          <!-- 子应用渲染区，用于挂载子应用节点 -->
          <section v-show="!$route.name" id="frame"></section>
        </el-main>
        <el-footer>Footer</el-footer>
      </el-container>
    </el-container>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'
import MainMenu from '@/components/MainMenu.vue'
import actions from '@/shared/actions'

@Component({
  components: {
    MainMenu
  }
})

export default class App extends Vue {
  /**
   * 菜单列表
   * key: 唯一 Key 值
   * title: 菜单标题
   * icon?: 图标
   * path: 菜单对应的路径
   */
  menus = [
    {
      key: 'Home',
      title: '主应用-主页',
      icon: 'el-icon-location',
      path: '/'
    },
    {
      key: 'About',
      title: '主应用-关于',
      icon: 'el-icon-location',
      path: '/about'
    },
    {
      key: 'VueMicroAppHome',
      title: 'Vue子应用-主页',
      icon: 'el-icon-menu',
      path: '/vue/'
    },
    {
      key: 'VueMicroAppAbout',
      title: 'Vue子应用-关于',
      icon: 'el-icon-menu',
      path: '/vue/about'
    }
  ]

  // 采用Action通信的Token
  actionToken = ''

  get actionVuexToken (): string {
    return this.$store.state.tokenModule.token
  }

  mounted (): void {
    console.log(this.menus)

    actions.onGlobalStateChange((state, prevState) => {
      // state: 变更后的状态; prevState: 变更前的状态
      console.log('主应用观察者：token 改变前的值为 ', prevState.token)
      console.log('主应用观察者：改变后的 token 的值为 ', state.token)
      this.actionToken = state.token
      this.$store.commit('tokenModule/setToken', state.token)
    }, true)
  }

  setMainAtionToken (): void {
    actions.setGlobalState({ token: 'mainAtionToken' })
  }

  setMainActionVuexToken (): void {
    actions.setGlobalState({ token: 'mainActionVuexToken' })
  }

  @Watch('actionVuexToken', { immediate: true })
  onActionVuexTokenChange (val: string, oldVal: string): void {
    // vuex中token值: val变更后的状态; oldVal: 变更前的状态
    console.log('主应用vuex中token值改变前的值为 ', oldVal)
    console.log('主应用vuex中token值改变后的值为 ', val)
  }
}
</script>

<style scoped lang="scss">
.head-content {
  font-weight: 400;
  font-size: 12px;
}
</style>

<style>
html,body {
  margin: 0;
}
</style>
