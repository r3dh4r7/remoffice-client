<template>
  <div class="my-3 my-md-5">
    <div class="container">
      <div class="page-header">
        <h1 class="page-title ml-5">
          Blackbox Storage
        </h1>
      </div>
    </div>
    <div class="container">
      <div class="row">
        <div v-if="$parent.serverAvailable && !storageEnabled" class="col-xl-12 text-center bg-warning">
          <p class="text-center text-white my-3"> Central storage disabled.</p>
        </div>
        <div :class="($parent.serverAvailable && storageEnabled && storagePortAvailable) ? 'col' : 'd-none'">
          <div class="card">
            <div class="card-header">
              <h3 class="card-title">
                <a class="text-primary align-middle'">
                  <i class="fe fe-folder icon-1halfx mr-1"></i>
                </a> {{ $parent.serverData.server.name }} / {{ $parent.serverData.blackbox.metadata['Name'] }} / Storage</h3>
              <div class="card-options">
                <a v-if="hasHistory" @click.prevent="navBack"><i class="fa fa-arrow-left"></i></a>
                <a class="card-options-fullscreen" data-toggle="card-fullscreen"><i @click.prevent="mutateCard" class="fa fa-window-maximize"></i></a>
              </div>
            </div>
            <iframe id="StorageFrame" :class="($parent.serverAvailable && storageEnabled && storagePortAvailable) ? 'storage-viewport p-0 col-12' : 'd-none'" :src="storageUrl" allowfullscreen></iframe>
          </div>
        </div>
      </div>
      <div v-if="!$parent.serverAvailable" class="row">
        <div class="col-xl-12 text-center bg-danger">
          <p class="text-center text-white my-3">Server unavailable.</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import appConfig from '../config'

export default {
  name: 'Storage',
  data () {
    return {
      appConfig: appConfig,
      hasHistory: false
    }
  },
  computed: {
    storagePort () {
      let serverData = this.$parent.serverData
      return (serverData.servlets) ? serverData.servlets.storage.port : null
    },
    storageUrl () {
      if (this.storageEnabled && this.storagePortAvailable) {
        return 'http://' + window.location.host.split(':')[0] + ':' + this.storagePort
      } else {
        return ''
      }
    },
    storageEnabled () {
      if (typeof this.$parent.masterSwitches.blackboxStorage === 'undefined') {
        return false
      }
      return !!this.$parent.masterSwitches.blackboxStorage.state
    },
    storagePortAvailable () {
      return !!this.$parent.serverAvailable && this.storagePort
    }
  },
  mounted () {
    const vm = this

    if (this.storageEnabled) {
      let iframe = document.getElementById('StorageFrame')
      if (iframe) {
        iframe.setAttribute('src', this.storageUrl)
        setTimeout(() => iframe.setAttribute('src', this.storageUrl), 2000)
      }
    }

    window.addEventListener('blur', function () {
      if (document.activeElement instanceof HTMLIFrameElement) {
        vm.hasHistory = true
      }
    })
  },
  methods: {
    navBack () {
      window.history.go(-1)
    }
  }
}
</script>
