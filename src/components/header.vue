<template>
    <header class="main-header animated" :class="{closeLogo:sidebar.collapsed,mobileLogo:device.isMobile}">
        <a href="#" class="logo">
            <span class="logo-lg"><i class="fa fa-empire"></i>&nbsp; <b>Lly-Admin</b></span>
        </a>
        <nav class="navbar">
            <a href="#" class="sidebar-toggle" @click.stop.prevent="toggleMenu(!sidebar.collapsed,device.isMobile)">
                <span class="sr-only">Toggle</span>
            </a>
            <div class="navbar-menu">
                <el-dropdown trigger="click" @command="handleCommand">
                    <div class="el-dropdown-link">
                        <img src="/static/img/user.png" class="avatar">{{adminInfo}}<i class="el-icon-arrow-down el-icon--right"></i>
                    </div>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item command="setting">设置</el-dropdown-item>
                        <el-dropdown-item command="loginOut" divided @click="loginOut">退出登录</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </div>  
        </nav>
    </header>
</template>

<script>
    import {mapGetters, mapActions, mapMutations} from 'vuex'
    import types from '../store/mutation-types'
    export default {
        data() {
            return {
                
            }
        },
        computed: {
             ...mapGetters({
                sidebar: 'sidebar',
                device: 'device',
                adminInfo: 'adminInfo'
             })
        },
        methods: {
            toggleMenu(collapsed, isMobile) {
                if(isMobile) {
                    this.toggleSidebarShow();
                }else {
                    this.toggleSidebar();
                }
            },
            ...mapMutations({
                toggleSidebar: types.TOGGLE_SIDEBAR,
                toggleSidebarShow: types.TOGGLE_SIDEBAR_SHOW,
                setUserInfo: types.SET_USER_INFO,
                deleteToken: types.DELETE_TOKEN
            }),
            handleCommand(cmd) {
                if(cmd === 'loginOut') {
                    this.loginOut()
                }
            },
            loginOut() {
               this.$confirm('此操作将退出系统, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.deleteToken()
                    this.$router.push('/login');
                    this.$message({
                        type: 'success',
                        message: '退出成功',
                        center: true
                    });
                }).catch(() => {

                })
            }
        }
    }
</script>

<style scoped>
    .animated {
        animation-duration: .4s;
    }
    .main-header {
        position: fixed;
        min-width: 100%;
        box-shadow: 0 2px 3px hsla(0, 0%, 7%, .1), 0 0 0 1px hsla(0, 0%, 7%, .1);
        z-index: 999;
        animation-name: slideInDown;
        animation-fill-mode: both;
        color: #48576a;
    }
    .main-header a{
        text-decoration: none;
        color: #48576a;
    }
    .main-header .navbar .sidebar-toggle {
        float: left;
        background-color: transparent;
        padding: 15px 15px;
        font-family: fontAwesome;
        line-height: 20px;
    }
    .main-header .navbar .sidebar-toggle:before {
        content: "\f03b";
    }
    .main-header {
        background-color: #87bf91;
    }
    .main-header .logo {
    -webkit-transition: width 0.3s ease-in-out;
    -o-transition: width 0.3s ease-in-out;
    transition: width 0.3s ease-in-out;
    display: block;
    float: left;
    height: 50px;
    font-size: 20px;
    line-height: 50px;
    text-align: center;
    width: 230px;
    font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
    padding: 0 15px;
    font-weight: 300;
    overflow: hidden;
    text-decoration: none;
    border-right: 1px solid #eee;
  }
  .main-header .logo .logo-lg {
    display: block;
    height: 38px;
    line-height: 38px;
    margin-top: 6px;
  }

  .main-header .navbar {
    -webkit-transition: margin-left 0.3s ease-in-out;
    -o-transition: margin-left 0.3s ease-in-out;
    transition: margin-left 0.3s ease-in-out;
    margin-bottom: 0;
    margin-left: 230px;
    border: none;
    min-height: 50px;
    border-radius: 0;
    background-color: #87bf91;
  }

  .layout-top-nav .main-header .navbar {
    margin-left: 0;
  }


  body.hold-transition .main-header .navbar,
  body.hold-transition .main-header .logo {
    -webkit-transition: none;
    -o-transition: none;
    transition: none;
  }

  .main-header .navbar .sidebar-toggle {
    display: block;
  }

  .main-header .navbar .sidebar-toggle:hover {
    background: #f9f9f9;
  }

  .main-header .logo {
    border-bottom: 0 solid transparent;
  }
   @media (max-width: 800px) {
    .main-header .logo {
      display: none;
    }
    .main-header .navbar {
      margin: 0;
    }
    .main-header .logo, .main-header .navbar {
      width: 100%;
      float: none;
    }
    .navbar-menu {
        margin-right: 1rem;
    }

  }
  .main-header.closeLogo .navbar {
      margin-left: 44px;
  }
  .main-header.closeLogo .logo {
      width: 44px;
      padding: 0 8px;
  }
  .main-header.closeLogo .logo .logo-lg b {
      display: none;
  }
  .main-header.closeLogo .sidebar-toggle {
      background: #87bf91;
  }
  .main-header.closeLogo .navbar .sidebar-toggle:before {
      content: "\f03c";
  }
  .main-header.mobileLogo .navbar .sidebar-toggle:before {
      content: "\f03a";
  }
  .navbar-menu {
      float: right;
      margin-right: 20px;
  }
  .navbar-menu .el-dropdown-link {
      cursor: pointer;
      height: 50px;
      padding: 13px 5px;
      min-width: 50px;
      text-align: center;
  }
  .navbar-menu .el-dropdown-link img {
      background-color: #108ee9;
  }
  .navbar-menu .el-dropdown-link:hover {
      background: #f9f9f9;
  }
 

 .avatar {
        width: 25px;
        height: 25px;
        border-radius: 50%;
        vertical-align: middle;
    }


</style>