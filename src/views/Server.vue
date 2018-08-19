<template>
  <div class="my-3 my-md-5">
    <div class="container">
      <div class="page-header">
        <h1 class="page-title ml-5">
          Server &amp; Blackbox Monitor
        </h1>
      </div>
      <div v-if="$parent.serverAvailable" class="row row-cards">
        <div class="col-lg-3">
          <div class="row">
            <div class="col-md-6 col-lg-12">
              <div class="card">
                <div class="card-body">
                  <div class="mb-5 text-center">
                    <img :src="blackboxImage" :alt="$parent.serverData.blackbox.metadata.name" class="img-fluid">
                  </div>
                  <h4 class="card-title text-center">{{ $parent.serverData.blackbox.metadata['Name'] }} <span class="text-muted text-center">{{ $parent.serverData.blackbox.metadata['Model'] }}</span></h4>
                  <div class="card-subtitle text-center">
                    {{ $parent.serverData.server.name }} {{ $parent.serverData.server.version }} on {{ $parent.serverData.blackbox.metadata['OS'] }}
                  </div>
                  <div class="mt-5 d-flex align-items-center">
                    <div class="m-auto">
                      <button @click.prevent="$parent.rebootBlackbox('now')" class="btn btn-outline-primary btn-sm mt-1"><i class="fa fa-undo"></i> Reboot</button> <button @click.prevent="$parent.shutdownBlackbox('now')" class="btn btn-outline-danger btn-sm mt-1"><i class="fa fa-power-off"></i> Shutdown</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-lg-9">
          <div class="card">
            <table class="table card-table table-vcenter">
              <tr class="d-flex">
                <td class="col-md-3 col-sm-4 col-xs-3 text-left text-muted">Server Name</td>
                <td class="col-md-9 col-sm-8 col-xs-9 text-left">{{ $parent.serverData.server.name }}</td>
              </tr>
              <tr class="d-flex">
                <td class="col-md-3 col-sm-4 col-xs-3 text-left text-muted">Server Version</td>
                <td class="col-md-9 col-sm-8 col-xs-9 text-left">{{ $parent.serverData.server.version }}</td>
              </tr>
              <tr v-for="(key, index) in Object.keys($parent.serverData.blackbox.metadata)" v-bind:key="index" class="d-flex">
                <td class="col-md-3 col-sm-4 col-xs-3 text-left text-muted">Blackbox {{ key }}</td>
                <td class="col-md-9 col-sm-8 col-xs-9 text-left">{{ $parent.serverData.blackbox.metadata[key] }}</td>
              </tr>
              <tr class="d-flex">
                <td class="col-md-3 col-sm-4 col-xs-3 text-left text-muted">Status</td>
                <td class="col-md-9 col-sm-8 col-xs-9 text-left">
                  <span v-if="$parent.serverData.blackbox.status === 'running'" class="text-primary">Running</span>
                  <span v-else-if="$parent.serverData.blackbox.status === 'rebooting'" class="text-warning">Rebooting</span>
                  <span v-else-if="$parent.serverData.blackbox.status === 'stopped'" class="text-danger">Shutdown by client</span>
                  <span v-else class="text-default">Not running</span>
                </td>
              </tr>
              <tr class="d-flex">
                <td class="col-md-3 col-sm-4 col-xs-3 text-left text-muted">Connected</td>
                <td class="col-md-9 col-sm-8 col-xs-9 text-left">{{ $parent.serverData.server.clientCount }} client {{ $parent.serverData.server.clientCount > 1 ? 'instances' : 'instance'}}</td>
              </tr>
              <tr class="d-flex">
                <td class="col-md-3 col-sm-4 col-xs-3 text-left text-muted">Server IP(s)</td>
                <td class="col-md-9 col-sm-8 col-xs-9 text-left">
                  <p class="mb-0" v-for="(ip, index) in $parent.serverData.ipAddresses" v-bind:key="index">{{ ip[0] }}: {{ ip[1] }}</p>
                </td>
              </tr>
              <tr class="d-flex">
                <td class="col-md-3 col-sm-4 col-xs-3 text-left text-muted">Blackbox Location</td>
                <td class="col-md-9 col-sm-8 col-xs-9 text-left">{{ $parent.serverData.blackbox.location }}</td>
              </tr>
            </table>
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
import appConfig from '../config'

export default {
  name: 'Server',
  computed: {
    blackboxImage () {
      let url = 'http://'
      url += localStorage.getItem(appConfig.name + '_' + 'server')
      url += '/server-assets/blackbox/images/index.png'
      return url
    }
  }
}
</script>
