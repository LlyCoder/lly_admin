import Vue from 'vue'
import Router from 'vue-router'
import {sync} from 'vuex-router-sync'
import Home from '../views/Home'
import UserList from '../views/UserList'
import Login from '../views/Login'
import ArticleList from '../views/ArticleList'
import Post from '../views/Post'
import EditPage from '../views/EditPage'
import AddTags from '../views/AddTags'
import TagList from '../views/TagList'
import EditTag from '../views/EditTag'
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
        },
        {
          path: 'addTags',
          component: AddTags
        },
        {
          path: 'taglist',
          component: TagList
        },
        {
          path: '/editTag/:id',
          component: EditTag
        },
      ],
      redirect: '/index'
    },
    { path: '*', component: NotFoundPage}
  ]
})

