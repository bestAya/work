import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex);
var store =new Vuex.Store({
    state: {
       login:'',
        aid:'',
        rid:'',
        leve:'',
        role:'',
        admin:'',
        part:'',
        user:''
    },
    mutations: {
        setleve (state,value) {
            state.leve=value;
        },
        setrole(state,value){
            state.role=value;
        },
        setaid(state,value){
            state.aid=value;
        },
        setrid(state,value){
            state.rid=value;
        },
        setadmin(state,value){
            state.admin=value;
        },
        setpart(state,value){
            state.part=value;
        },
        setuser(state,value){
            state.user=value;
        }
    }
})
export default store;