<template>
  <div>
    <lv-header></lv-header>
    <lv-side-menu></lv-side-menu>
    <div class="content-wrapper" :class="{ slideCollapse: sidebar.collapsed,mobileSide:device.isMobile}">
      <el-scrollbar tag="div" wrapClass="content-scrollbar">
        <section class="content">
          <el-breadcrumb separator="/">
            <template v-for="child in currentMenus">
              <el-breadcrumb-item :to="{ path: child.href }">{{child.name}}</el-breadcrumb-item>
            </template>
          </el-breadcrumb>
          <transition mode="out-in" enter-active-class="fadeIn" leave-active-class="fadeOut" appear>
            <router-view></router-view>
          </transition>
        </section>
      </el-scrollbar>
    </div>
    
  </div>
</template>

<script>
  import lvHeader from './components/header'
  import lvSideMenu from './components/sideMenu'
  import {mapGetters, mapActions, mapMutations} from 'vuex'
  import types from './store/mutation-types'
  import 'animate.css'

  export default {
    name: 'app',
    data() {
      return {
        breadcrumb: []
      }
    },
    watch: {
      '$route': function (to, from) {
      }
    },
    beforeRouteEnter (to, from, next) {
      //当前不能通过this来访问vue实例
      //因为守卫在导航确认前被调用,因此即将登场的新组件还没被创建。不能访问当前实例
      //通过传一个回调给 next来访问组件实例。在导航被确认的时候执行回调，并且把组件实例作为回调方法的参数。
      next(vm => {
        if (!vm.$store.state.access_token) {
            vm.$message({
              showClose: true,
              message: '当前未登录！',
              center: true,
              type: 'warning'
            });
            vm.$router.push('/login')
        } 
      })
    },
    components: {
      lvHeader,
      lvSideMenu
    },
    computed: {
      ...mapGetters({
        sidebar: 'sidebar',
        device: 'device',
        currentMenus: 'currentMenus',
        adminInfo: 'adminInfo'
      })
    },
    created() { 
      this.$router.beforeEach((to, from, next) => {
        this.$store.dispatch('changeCurrentMenu', to);
        next()
      })
      this.$router.afterEach((to, from) => {
        
      });
      this.$http.defaults.headers.common['Authorization'] = 'Bearer ' + this.$store.state.access_token;
      this.$http.get('/api/user').then(res => {
        if (res.data.id) {
          this.setInfo(res.data.name);
        }
      })
    },
    beforeMount() {
      const {body} = document;
      const WIDTH = 790;
      const toggleHander = () => {
        //判断页面是否隐藏
        if(!document.hidden) {
          //获取页面边框属性
          let rect = body.getBoundingClientRect();
          let isMobile = rect.width < WIDTH;
          this.toggleDevice(isMobile);
          if(isMobile) {
            this.toggleSidebarShow(false);
            this.toggleSidebar(false);
          } else {
            this.toggleSidebarShow(true);
          }
        }
      }
     document.addEventListener('visibilitychange', toggleHander);
     window.addEventListener('DOMContentLoaded', toggleHander);
     window.addEventListener('resize', toggleHander);
    },
    methods: {
      ...mapMutations({
        toggleDevice: types.TOGGLE_DEVICE,
        toggleSidebar: types.TOGGLE_SIDEBAR,
        toggleSidebarShow: types.TOGGLE_SIDEBAR_SHOW,
        setInfo: types.SET_INFO
      }),
      ...mapActions({
        changeCurrentMenu: 'changeCurrentMenu' // this.$store.dispatch('changeCurrentMenu')
      })
    }
  }
</script>

<style>
  .animated {
    animation-duration: .4s;
  }

  blockquote, body, dd, dl, dt, fieldset, figure, h1, h2, h3, h4, h5, h6, hr, html, iframe, legend, li, ol, p, pre, textarea, ul {
    margin: 0;
    padding: 0;
  }

  *,:after, :before {
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
  }


  .content-wrapper {
    -webkit-transition: -webkit-transform 0.3s ease-in-out, margin 0.3s ease-in-out;
    -moz-transition: -moz-transform 0.3s ease-in-out, margin 0.3s ease-in-out;
    -o-transition: -o-transform 0.3s ease-in-out, margin 0.3s ease-in-out;
    transition: transform 0.3s ease-in-out, margin 0.3s ease-in-out;
    margin-left: 230px;
    padding-top: 50px;
  }

  .content-scrollbar{
    height: calc(100vh - 50px);
  }

  .content-wrapper .el-scrollbar__bar.is-vertical{
    display: none;
  }

  .content-wrapper .content {
    padding: 1.25rem;
  }

  .content-wrapper.slideCollapse{
    margin-left: 44px;
  }

  .content-wrapper.mobileSide{
    margin-left: 0px;
  }
  .el-breadcrumb {
    margin-bottom: 20px;
  }
</style>
