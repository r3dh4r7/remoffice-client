<template>
  <div class="my-3 my-md-5">
    <div class="container">
      <div class="page-header">
        <h1 class="page-title ml-5">
          Surveillance
        </h1>
      </div>
      <div v-if="$parent.serverAvailable" class="row row-cards">
        <div v-if="!surveillanceEnabled" class="col-xl-12 text-center bg-warning">
          <p class="text-center text-white my-3">Surveillance disabled.</p>
        </div>
        <div v-else-if="$parent.cams.length < 1" class="col-xl-12 text-center bg-warning">
          <p class="text-center text-white my-3">Polling for cams...</p>
        </div>
        <div v-else v-for="c in $parent.cams" v-bind:key="c.id" class="col-sm-6 col-lg-4">
          <div class="cam card">
            <div class="card-header">
              <h3 class="card-title">
                <a :href="c.controlUrl" target="_blank" :class="c.isActive ? 'text-success' : 'text-danger' + ' align-middle'">
                  <i class="fe fe-camera icon-1halfx mr-1"></i>
                </a> Cam {{ c.id }}</h3>
              <div class="card-options">
                <a v-if="c.isActive" target="_blank" :href="c.url" class=""><i class="fa fa-external-link-square-alt"></i></a>
                <a class="card-options-collapse" data-toggle="card-collapse"><i @click.prevent="mutateCard" class="fa fa-chevron-up"></i></a>
                <a class="card-options-fullscreen" data-toggle="card-fullscreen"><i @click.prevent="mutateCard" class="fa fa-window-maximize"></i></a>
              </div>
            </div>
            <div class="card-body" :style="c.isActive ? 'background-image: url(' + c.url + ')' : ''" :id="'cam' + c.id"></div>
            <div class="card-footer">
              <div>{{ c.name }}</div>
              <small class="d-block text-muted">{{ $parent.rooms[c.Room_id].name }}</small>
            </div>
          </div>
        </div>
      </div>
      <div v-else class="row">
        <div class="col-xl-12 text-center bg-danger">
          <p class="text-center text-white my-3">Server unavailable.</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import appConfig from '../config'

export default {
  name: 'Surveillance',
  computed: {
    surveillanceEnabled () {
      if (typeof this.$parent.masterSwitches.surveillance === 'undefined') {
        return false
      }
      return !!this.$parent.masterSwitches.surveillance.state
    }
  },
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
