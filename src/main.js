import Vue from 'vue'
import router from './router/router'
import app from './app.vue'
import './components/css/allCss'
import './mock/mockApi'
import moment from 'moment'
Vue.filter('my-date', function (value) {
  // 返回处理后的值
  return moment(value).format(' YYYY-MM-DD, HH:mm:ss')
})

new Vue({
  el: '#app',
  router,
  render: h => h(app)
})
