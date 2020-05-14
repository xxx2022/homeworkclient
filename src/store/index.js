import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

//创建一个 store(仓库)
const store = new Vuex.Store({
    state: {
      userinfo:{
        id: '',
        username: '',
        name: '',
        password: null,
        classId: '',
        power: '',
        time: '',
        finished: '',
      }
    },
    mutations: {  //必须是同步的，不能发请求
      setUserInfo (state,userinfo) {
        state.userinfo = userinfo;
      },
      setUserClassId(state,classId) {
        state.userinfo.classId = classId;
      },
      setUserPower(state,power) {
        state.userinfo.power = power;
      }
    
    },
    actions: {  //可以执行异步请求
      setUserInfoFun(context,userinfo){
            context.commit('setUserInfo',userinfo)
        },
      setUserClassIdFun(context,classId) {
        context.commit('setUserClassId',classId)
      } ,
      setUserPowerdFun(context,power) {
        context.commit('setUserPower',power)
      } 
    }
  })
//可以通过 store.state 来获取状态对象，以及通过 store.commit 方法触发状态变更：
//store.commit('increment')    console.log(store.state.count) //
// 从sessionStorage中取值

// 从sessionStorage中取值
if (sessionStorage.getItem('store')) {
  store.replaceState(
    Object.assign(
      {},
      store.state,
      JSON.parse(sessionStorage.getItem('store'))
    )
  )
 
　　 sessionStorage.removeItem('store')
}
// 监听页面刷新，将数据全部保存到sessionStorage中
window.addEventListener('beforeunload', () => {
  sessionStorage.setItem('store', JSON.stringify(store.state))
})

  export default store