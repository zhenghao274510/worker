import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex);
const store = new Vuex.Store({
  state: {
    //   导航 选中
   tarba:0,
   ordertabar:0,
   Classtarta:0,
   uid:'',
   //  返回键
   back:true,

    useAddres: {},
    SearchList:[],
    share:{}
  },
  mutations: {
    // 刷新保存state数据
    SaveData(state,val){
       state=val;
    },
  
  
    AddAdress(state, val) {
      state.useAddres = val;
    },


    SearStar(state,val){
      state.SearchList=val;
    },
    ChangeTabar(state,val){
      state.tarba=val;
    },
    ChangeOrdertabar(state,val){
      state.ordertabar=val;
    },
    ChangeClassTatar(state,val){
      state.Classtarta=val;
    },
    //   用户uid
    ChangeUId(state,val){
      state.uid=val;
    },
    onback(state,val){
      state.back=val;
    },
    shareCard(state,val){
      state.share=val;
    }

  },
  getters() {

  },
  actions() {

  }
})
export default store
