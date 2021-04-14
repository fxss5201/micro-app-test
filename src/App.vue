<template>
  <div>
    <el-container>
      <el-aside width="200px">
        <main-menu :menus="menus"></main-menu>
      </el-aside>
      <el-container>
        <el-header>Header</el-header>
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
import { Component, Vue } from 'vue-property-decorator'
import MainMenu from '@/components/MainMenu.vue'
import actions from '@/shared/actions'

@Component({
  components: {
    MainMenu
  }
})

export default class App extends Vue {
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  data () {
    return {
      /**
       * 菜单列表
       * key: 唯一 Key 值
       * title: 菜单标题
       * icon?: 图标
       * path: 菜单对应的路径
       */
      menus: [
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
    }
  }

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  get token () {
    return this.$store.state.token
  }

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  mounted () {
    actions.onGlobalStateChange((state, prevState) => {
      // state: 变更后的状态; prevState: 变更前的状态
      console.log('主应用观察者：token 改变前的值为 ', prevState.token)
      console.log('主应用观察者：登录状态发生改变，改变后的 token 的值为 ', state.token)
    })

    setTimeout(() => {
      const token = 'tokentokentokentoken'
      actions.setGlobalState({ token })
      this.$store.commit('setToken', 'setToken')
    }, 3000)
  }
}
</script>

<style>
html,body {
  margin: 0;
}
</style>
