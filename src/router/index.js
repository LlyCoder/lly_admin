import Vue from 'vue'
import Router from 'vue-router'
import {sync} from 'vuex-router-sync'
import Home from '../views/Home'
import UserList from '../views/UserList'
import Login from '../views/Login'
import ArticleList from '../views/ArticleList'
import Post from '../views/Post'
import EditPage from '../views/EditPage'
import NotFoundPage from '../components/pages/404notfound'
import App from '../App'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/login',
      component: Login
    },
    {
      path: '',
      component: App,
      children: [
        {
          path: '/index',
          component: Home
        },
        {
          path: '/userList',
          component: UserList
        },
        {
          path: '/articleList',
          component: ArticleList
        },
        {
          path: '/edit/:id',
          component: EditPage
        },
        {
          path: '/post',
          component: Post
        }
      ],
      redirect: '/index'
    },
    { path: '*', component: NotFoundPage}
  ]
})

