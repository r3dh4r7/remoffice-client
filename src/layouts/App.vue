<template>
  <div class="page">
    <div class="page-main">
      <div class="header py-4">
        <div class="container">
          <div class="d-flex">
            <a class="header-brand" href="./index.html">
              <img src="static/img/logo/main.png" class="header-brand-img" alt="tabler logo">
            </a>
            <div class="d-flex order-lg-2 ml-auto">
              <div class="dropdown">
                <a class="nav-link pr-0 leading-none">
                  <span class="avatar avatar-img"></span>
                  <span class="ml-2 mr-5 d-none d-sm-block">
                    <span class="text-primary">Remote User</span>
                    <small class="text-muted d-block mt-1">Administrator</small>
                  </span>
                </a>
              </div>
              <div class="dropdown d-none d-md-flex">
                <a class="nav-link icon" data-toggle="dropdown">
                  <i class="fa fa-bell"></i>
                  <span class="nav-unread"></span>
                </a>
                <div class="dropdown-menu dropdown-menu-right dropdown-menu-arrow">
                  <ul class="notif-list">
                    <li v-for="(n, index) in notifications" v-bind:key="index">
                      <div class="ml-5 mr-5">
                        <span :class="'avatar float-left mr-2 text-' + n.type">
                          <i v-if="n.type === 'success'" class="fa fa-check-circle"></i>
                          <i v-if="n.type === 'info'" class="fa fa-info-circle"></i>
                          <i v-if="n.type === 'warning'" class="fa fa-info-circle"></i>
                          <i v-if="n.type === 'danger'" class="fa fa-exclamation-circle"></i>
                        </span>
                        <div>{{ n.text }}</div>
                        <div><span class="small text-muted">{{ n.title }} - {{ notifTime(n.time) }}</span></div>
                      </div>
                    </li>
                  </ul>
                  <div class="dropdown-divider"></div>
                  <a href="#" class="dropdown-item text-center text-muted-dark">Clear notifications</a>
                </div>
              </div>
              <div class="dropdown d-none d-md-flex">
                <a class="nav-link icon" data-toggle="dropdown">
                  <i class="fa fa-server"></i>
                  <span v-if="serverAvailable" class="nav-status-live"></span>
                  <span v-else-if="serverData.blackbox.status === 'not-connected'" class="nav-status-default"></span>
                  <span v-else class="nav-status-off"></span>
                </a>
                <div class="dropdown-menu dropdown-menu-right dropdown-menu-arrow">
                  <p class="px-5 my-2 text-nowrap">
                    <span v-if="serverAvailable" class="text-success">Connected</span>
                    <span v-else-if="serverData.blackbox.status === 'not-connected'" class="text-warning">Not connected</span>
                    <span v-else class="text-danger">Disconnected</span>
                  </p>
                  <p class="px-5 my-2 text-nowrap"><span class="text-default">{{ serverData.server.name }}</span> <span class="text-muted">{{ serverData.server.version }}</span></p>
                  <p class="px-5 my-2 text-nowrap"><span class="text-default">{{ serverData.blackbox.metadata['Name'] }}</span> <span class="text-muted">{{ serverData.blackbox.metadata['Model'] }}</span></p>
                  <p class="px-5 my-2 text-nowrap"><span class="text-primary">{{ $socket.io.uri }}</span></p>
                </div>
              </div>
            </div>
            <a href="#" class="header-toggler d-lg-none ml-3 ml-lg-0" data-toggle="collapse" data-target="#headerMenuCollapse">
              <span class="header-toggler-icon"></span>
            </a>
          </div>
        </div>
      </div>
      <div class="header collapse d-lg-flex p-0" id="headerMenuCollapse">
        <div class="container">
          <div class="row align-items-center">
            <div class="col-lg-3 ml-auto d-sm-none">
              <div class="my-3 my-lg-0 text-center text-lg-right card-subtitle">
                <span v-if="serverAvailable">
                  <span class="text-success mx-1"><i class="fa fa-circle"></i></span> <span class="text-default">Connected</span>
                </span>
                <span v-else-if="serverData.blackbox.status === 'not-connected'">
                  <span class="text-warning mx-1"><i class="fa fa-circle"></i></span> <span class="text-default">Not connected</span>
                </span>
                <span v-else>
                  <span class="text-danger mx-1"><i class="fa fa-circle"></i></span> <span class="text-default">Disconnected</span>
                </span>
              </div>
            </div>
            <div class="col-lg order-lg-first">
              <ul class="nav nav-tabs border-0 flex-column flex-lg-row">
                <li class="nav-item">
                  <router-link to="dashboard" class="nav-link"><i class="mr-2 fa fa-home"></i> Dashboard</router-link>
                </li>
                <li class="nav-item">
                  <router-link to="switches" class="nav-link"><i class="mr-2 fa fa-power-off"></i> Switches</router-link>
                </li>
                <li class="nav-item">
                  <router-link to="surveillance" class="nav-link"><i class="mr-2 fa fa-camera"></i> Surveillance</router-link>
                </li>
                <li class="nav-item">
                  <router-link to="storage" class="nav-link"><i class="mr-2 fa fa-folder"></i> Storage</router-link>
                </li>
                <li class="nav-item">
                  <router-link to="server" class="nav-link"><i class="mr-2 fa fa-server"></i> Server</router-link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <router-view></router-view>
    </div>
    <footer class="footer">
      <div class="container">
        <div class="row align-items-center flex-row-reverse">
          <div class="mt-0 mb-0 col-12 col-lg-auto mt-lg-0 m-lg-auto text-center">
            Copyright © 2018 <a href="http://projects.dualsight.org/remoffice" target="_blank">Remoffice</a>. Crafted by <a href="http://people.darkstack.org/redhart" target="_blank">Justin (Redhart) Andrew</a>. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
import appConfig from '../config'
import '../../node_modules/animate.css/animate.min.css'
import '../../node_modules/toastr/build/toastr.min.css'
import '../../node_modules/nprogress/nprogress.css'
import '../../node_modules/feathericon/build/css/feathericon.css'
import '../../node_modules/@icon/font-awesome/font-awesome.css'
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css'
import '../assets/css/dashboard.css'
const $ = require('jquery')
window.$ = $
window.jQuery = window.$
require('bootstrap')

export default {
  name: 'AppLayout',
  data () {
    return {
      appConfig: appConfig,
      notifications: [],
      serverData: {
        blackbox: {
          status: 'not-connected',
          metadata: {}
        },
        server: {}
      },
      cams: [],
      rooms: [],
      switches: [],
      masterSwitches: []
    }
  },
  computed: {
    serverAvailable () {
      return this.serverData.blackbox.status === 'running'
    }
  },
  methods: {
    notifTime (dateObj) {
      return this.timeAgo(dateObj)
    },
    notify (notif) {
      notif.time = new Date()
      this.notifications.push(notif)
      this.showNotification(notif.title, notif.text, notif.type, notif.duration, notif.delay, false, true)
    },
    getMasterSwitch (id) {
      return this.masterSwitches.find((obj) => obj.id === id) ||
      { state: 0 }
    },
    switchToggle (e) {
      this.$socket.emit('toggleSwitch', this.switches[e.target.id])
    },
    masterSwitchToggle (name) {
      this.$socket.emit('toggleMasterSwitch', this.masterSwitches[name])
    },

    // reboot blackbox in `delay` seconds
    rebootBlackbox (delay) {
      this.$socket.emit('rebootBlackbox', delay)
    },

    // shutdown blackbox in `delay` seconds
    shutdownBlackbox (delay) {
      this.$socket.emit('shutdownBlackbox', delay)
    }
  },
  sockets: {
    notification: function (notif) {
      this.notify(notif)
    },
    connect: function () {
      // do nothing for now
    },
    disconnect: function () {
      this.serverData.blackbox.status = 'disconnected'
      this.cams = []
      this.rooms = []
      this.switches = []
      this.masterSwitches = []
    },
    serverData: function (data) {
      this.serverData = data
    },
    cams: function (data) {
      let c = {}

      for (let i = 0; i < data.length; i++) {
        c[data[i].id] = data[i]
        c[data[i].id].isActive = false
      }

      this.cams = c
    },
    rooms: function (data) {
      let o = {}

      for (let i = 0; i < data.length; i++) {
        o[data[i].id] = data[i]
      }

      this.rooms = o
    },
    switches: function (data) {
      let s = {}

      for (let i = 0; i < data.length; i++) {
        s[data[i].id] = data[i]
      }

      this.switches = s
    },
    masterSwitches: function (data) {
      let ms = {}

      for (let i = 0; i < data.length; i++) {
        ms[data[i].name] = data[i]
      }

      this.masterSwitches = ms
    },

    camUpdate: function (dataNode) {
      this.cams[dataNode.id] = dataNode
    }
    // no use for the server side of the following yet
    // switchUpdate: function (dataNode) {
    //   this.switches[dataNode.id] = dataNode
    // },
    // masterSwitchUpdate: function (dataNode) {
    //   this.masterSwitches[dataNode.id] = dataNode
    // }
  },
  mounted () {
    $('#headerMenuCollapse .nav-link').on('click', function () {
      $('#headerMenuCollapse').collapse('hide')
    })
  }
}
</script>
