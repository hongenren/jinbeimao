import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

// var store=new Vuex.Store({
//     state:{
//         name:"",
//         str:0,
//         mai:0,
//         zong:"",
//         msg:"请选择",
//         showLoading: false,
//     },
//     mutations:{
//           setShowLoading (state) {
//             state.showLoading = true;
//         },
//         setHideLoading (state) {
//             state.showLoading = false;
//         },
//         shuju(a,b){
//             a.name=b
//             console.log( a.name)

//         },
//         chongzhi(a,c){

//           a.str+= Number(c)
//           a.zong=a.str

//         },

//         goumai(a,d){
//             a.mai=d
//             a.zong=a.str-d
//         },
//         msg(a,b){
//             a.msg=b

//         }

//     },
//     getters:{
//       shujuu(state){
//         return state.name
//       },
//       showLoading (state) {
//         return state.showLoading;
//     },
//     }

// })


const store = new Vuex.Store({
  state: {
    todos: [
      { id: 1, text: '...', done: true },
      { id: 3, text: '...', done: true },

      { id: 2, text: '...', done: false }
    ]
  },
  getters: {
    doneTodos: state => {
      return state.todos.filter(todo => todo.done)
    }
  }
})

export default store;
