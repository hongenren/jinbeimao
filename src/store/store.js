import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

var store=new Vuex.Store({
    state:{
        name:"",
        str:0,
        mai:0,
        zong:"",
        msg:"请选择"
    },
    mutations:{

        shuju(a,b){
            a.name=b
            console.log( a.name)

        },
        chongzhi(a,c){

          a.str+= Number(c)
          a.zong=a.str

        },

        goumai(a,d){
            a.mai=d
            a.zong=a.str-d
        },
        msg(a,b){
            a.msg=b

        }

    }


})




export default store;
