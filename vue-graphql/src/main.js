// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import graphql from './graphql';
// 引入时间格式化插件
import moment from 'moment/moment'
Vue.config.productionTip = false

Vue.filter('moment', function (value, formatString) {
  formatString = formatString || 'YYYY-MM-DD HH:mm:ss';
  // return moment(value).format(formatString); // value可以是普通日期 20170723
  return moment.unix((+new Date(value)).toString().substring(0,10)).format(formatString); // 这是时间戳转时间
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  graphql,
  components: { App },
  template: '<App/>'
})
