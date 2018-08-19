import Vue from 'vue'
import mixins from './util/mixins'
import router from './router'

Vue.config.productionTip = false
Vue.mixin({ methods: mixins })

/* eslint-disable no-new */
window.vm = new Vue({
  el: '#app',
  router
})
