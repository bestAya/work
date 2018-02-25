import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex);
var store =new Vuex.Store({
    state: {
       datae:[],
        deg:0,
        num:0,
        user:'',
        uid:'',
        title:'',
        con:'',
        type:'',
        lis:0
    },
    mutations: {
        setdatae(state,value){
            state.datae=value;
        },
        setdeg(state,value){
            state.deg=value
        },
        setnum(state,value){
            state.num=value
        },
        setuser(state,value){
            state.user=value
        },
        setuid(state,value){
            state.uid=value
        },
        settitle(state,value){
            state.title=value
        },
        setcon(state,value){
            state.con=value
        },
        settype(state,value){
            state.type=value
        },
        setlis(state,value){
            state.lis=value
        }

    }
})
export default store;