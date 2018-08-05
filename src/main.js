import Vue from 'vue'
import VueSocketIO from 'vue-socket.io'
import SocketInstance from './util/socket'
import mixins from './util/mixins'
import router from './router'

Vue.config.productionTip = false
Vue.use(VueSocketIO, SocketInstance)
Vue.mixin({ methods: mixins })

/* eslint-disable no-new */
window.vm = new Vue({
  el: '#app',
  router
})
