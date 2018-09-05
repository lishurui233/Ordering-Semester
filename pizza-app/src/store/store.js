import Vue from 'vue'
import Vuex from 'vuex'
// import * as actions from './actions'
// import * as getters from './getters'
// import * as mutations from './mutations'

//模块化
import menu from './module/menu'
import status from './module/status'
import users from './module/users'




Vue.use(Vuex)
export const store = new Vuex.Store({
    // state:{
    //     // menuItems:{},
    //     // currentUser:null,
    //     // isLogin:false
    // },
    // getters,
    // mutations,
    // actions

    modules:{
        menu,
        status,
        users
    }

})