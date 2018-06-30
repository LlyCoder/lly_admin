import Vue from 'vue'
import Vuex from 'vuex'
import types from './mutation-types'
import defaultValue from '../mock/default'
import  api from '../api/index'
import { getSessionKey, getCurrentMenu} from '../until'
import { resolve } from 'upath';

Vue.use(Vuex)

const num = '123456';

const store = new Vuex.Store({
    strict: true,

    getters: {
        articleLIst: state => state.articleLIst,
        loading: state => state.loading,
        menuList: state => state.menuList,
        adminInfo: state => state.adminInfo,
        currentMenus: state => state.currentMenus,
        sidebar: state => state.sidebar,
        device: state => state.device,
        tagDetail: state => state.tagDetail,
        currentPage: state => state.currentPage
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
        access_token: sessionStorage.getItem('admin-token'),
        adminInfo: sessionStorage.getItem('admin-info'),
        tagDetail: sessionStorage.getItem('tag-detail'),
        currentPage: sessionStorage.getItem('current-page')
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
        [types.CREATE_TOKEN](state, access_token) {
            state.access_token = access_token;
            sessionStorage.setItem('admin-token', access_token)
        },
        [types.DELETE_TOKEN](state) {
            state.access_token = null;
            sessionStorage.setItem('admin-token', '');
        },
        [types.SET_INFO](state, info) {
            state.adminInfo = info;
            sessionStorage.setItem('admin-info', info);
        },
        [types.CURRENT_TAG](state, tagDetail) {
            state.tagDetail = tagDetail;
            sessionStorage.setItem('tag-detail', tagDetail);
        },
        [types.CURRENT_PAGE](state, currentPage) {
            state.currentPage = currentPage;
            sessionStorage.setItem('current-page', currentPage);
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
            Vue.axios.get(`/api/article/list/${page}`).then(res => {
                let lists = res.data;
                commit(types.LOAD_LIST, lists);
            })
        },
        createToken({ commit, state }, { grant_type, client_id, client_secret, username, password, scope}) {
            return api.createToken(grant_type, client_id, client_secret, username, password, scope).then(res => {
                //console.log('token：' + res.data.access_token);
                if (res.data.access_token) {
                    commit(types.CREATE_TOKEN, res.data.access_token);
                } else {
                    commit(types.DELETE_TOKEN);
                }
                return new Promise((resolve, reject) => {
                    resolve(res);
                })
            })
        }
    }
})

export default store;