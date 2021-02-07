import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

new Vue({
  //根组件上设置me，后续用的$root.me就是这儿，即当前用户
  data:{
    me:null
  },
  render: h => h(App),
}).$mount('#app')
