<template>
  <div class="my-3 my-md-5">
    <div class="container">
      <div class="page-header">
        <h1 class="page-title ml-5">
          Dashboard
        </h1>
      </div>
      <div class="row mb-3">
        <div class="col-md-6">
          <div class="alert alert-primary">Need a guide? <router-link to="guide" class="alert-link">Read the User Manual</router-link>.</div>
        </div>
      </div>
      <div class="row">
        <div class="col-sm-6 col-lg-3">
          <div class="card p-3">
            <div class="d-flex align-items-center">
              <span class="stamp stamp-md bg-blue mr-3">
                <i class="fa fa-users"></i>
              </span>
              <div>
                <h4 class="m-0"><a href="javascript:void(0)">{{ $parent.serverData.server.clientCount }} <small>Connected Client{{ $parent.serverData.server.clientCount === 1 ? '' : 's' }}</small></a></h4>
                <small class="text-muted">{{ !($parent.serverData.server.onlineUsers - 1) ? 'Just you' : $parent.serverData.server.onlineUsers - 1 + ' other users(s)' }}</small>
              </div>
            </div>
          </div>
        </div>
        <div class="col-sm-6 col-lg-3">
          <div class="card p-3">
            <div class="d-flex align-items-center">
              <span class="stamp stamp-md bg-green mr-3">
                <i class="fa fa-camera"></i>
              </span>
              <div>
                <h4 class="m-0"><a href="javascript:void(0)">{{ Object.keys($parent.cams).map(function (key) { return $parent.cams[key] }).length }} <small>Surveillance Cams</small></a></h4>
                <small class="text-muted">{{ Object.keys($parent.cams).map(function (key) { return $parent.cams[key] }).filter(function (el) { return el.isActive }).length }} online</small>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import appConfig from '../config'

export default {
  name: 'Dashboard',
  methods: {
    checkCams () {
      const vm = this

      for (var i = 1; i <= Object.keys(vm.$parent.cams).length; i++) {
        let cam = vm.$parent.cams[i]

        axios({
          requestId: cam.id,
          method: 'HEAD',
          url: cam.url
        })
          .then((res) => {
            vm.$parent.cams[res.config.requestId].isActive = true
          })
          .catch((err) => {
            vm.$parent.cams[err.config.requestId].isActive = false
          })
      }
    }
  },
  created () {
    let vm = this

    setTimeout(() => {
      this.checkCams()
    }, 500)

    this.camPoll = setInterval(vm.checkCams, appConfig.cams.pollInterval * 1000)
  },
  beforeDestroy () {
    clearInterval(this.camPoll)
  }
}
</script>
