import Vue from 'vue'
import mixins from './util/mixins'
import router from './router'
require('../node_modules/source-sans-pro/source-sans-pro.css')

Vue.config.productionTip = false
Vue.mixin({ methods: mixins })

/* eslint-disable no-new */
window.vm = new Vue({
  el: '#app',
  router
})
