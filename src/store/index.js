import Vue from 'vue'
import Vuex from 'vuex'
import types from './mutation-types'
import defaultValue from '../mock/default'
import  api from '../api/index'
import { getSessionKey, getCurrentMenu} from '../until'

Vue.use(Vuex)

const num = '123456';

const store = new Vuex.Store({
    strict: true,

    getters: {
        articleLIst: state => state.articleLIst,
        loading: state => state.loading,
        menuList: state => state.menuList,
        userInfo: state => state.userInfo,
        currentMenus: state => state.currentMenus,
        sidebar: state => state.sidebar,
        device: state => state.device
    },
    state: {
        articleLIst: [],
        loading: false,
        menuList: {},
        sidebar: {
            collapsed: getSessionKey('state.sidebar.collapsed', 'false') === 'true',
            show: getSessionKey('state.sidebar.show', 'true') === 'true'
        },
        device: {
            isMobile: false
        },
        currentMenus: [],
        token: sessionStorage.getItem('admin-token'),
        adminInfo: sessionStorage.getItem('admin-info')
    },
    //只能同步提交的函数
    mutations: {
        [types.TOGGLE_LOADING] (state) {
            state.loading = !state.loading
        },
        [types.TOGGLE_DEVICE] (state, isMobile) {
            state.device.isMobile = isMobile
        },
        [types.LOAD_LIST] (state, lists) {
            state.articleLIst = lists;
        },
        [types.LOAD_MENU](state, menu) {
            state.menuList = menu;
        },
        [types.TOGGLE_SIDEBAR] (state, collapsed) {
            if(collapsed == null) {
                collapsed = !state.sidebar.collapsed;
            }
            state.sidebar.collapsed = collapsed;
            window.sessionStorage.setItem('state.sidebar.collapsed', collapsed)
        },
        [types.TOGGLE_SIDEBAR_SHOW] (state, show) {
            if(show == null) {
                state.sidebar.show = !state.sidebar.show;
            } else {
                state.sidebar.show = show;
            }
            window.sessionStorage.setItem('state.sidebar.show', state.sidebar.show)
        },
        [types.LOAD_CURRENT_MENU](state, menu) {
            state.currentMenus = menu;
        },
        [types.CREATE_TOKEN](state, token) {
            state.token = token;
            sessionStorage.setItem('admin-token', token)
        },
        [types.DELETE_TOKEN](state) {
            state.token = null;
            sessionStorage.setItem('admin-token', '');
        },
        [types.SET_INFO](state, info) {
            state.adminInfo = info;
            sessionStorage.setItem('admin-info', info);
        }
    },
    actions: {
        //actions里面的函数可以异步
        toggleLoading: ({commit}) => commit(types.TOGGLE_LOADING),
        loadMenuList: ({commit}) => {
            commit(types.LOAD_MENU, defaultValue.menuList)
        },
        changeCurrentMenu: ({ state, commit }, { path, matched, fullPath }) => {
            const a = getCurrentMenu(fullPath, state.menuList);
            commit(types.LOAD_CURRENT_MENU, a.reverse());
        },
        loadList: ({state,commit}, page) => {
            Vue.axios.get(`/article/list/${num}/${page}`).then(res => {
                let lists = res.data;
                commit(types.LOAD_LIST, lists)
            })
        },
        createToken({ commit, state }, { grant_type, client_id, client_secret, username, password, scope}) {
            return api.createToken(grant_type, client_id, client_secret, username, password, scope).then(res => {
                //console.log('token：' + res.data.access_token);
                
            })
        }
    }
})

export default store;