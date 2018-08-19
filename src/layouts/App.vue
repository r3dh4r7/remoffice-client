<template>
  <div class="page">
    <div class="page-main">
      <div class="header py-4">
        <div class="container">
          <div class="d-flex">
            <a class="header-brand" href="./index.html">
              <img src="static/img/logo/main.png" class="header-brand-img" alt="Remoffice">
            </a>
            <div class="d-flex order-lg-2 ml-auto">
              <div class="dropdown">
                <a class="nav-link pr-0 leading-none" data-toggle="dropdown">
                  <span class="avatar avatar-img"></span>
                  <span class="ml-2 mr-5 d-none d-sm-block">
                    <span class="text-primary">{{ user('name') }}</span>
                    <small class="text-muted d-block mt-1">{{ user('privilegeName') }}</small>
                  </span>
                </a>
                <div class="dropdown-menu dropdown-menu-right dropdown-menu-arrow">
                  <a class="dropdown-item" href="#" @click.prevent="logout({title: 'Logged Out', text: 'Your session has been destroyed.', type: 'info'})">
                    <i class="dropdown-icon fa fa-power-off"></i> Sign Out
                  </a>
                </div>
              </div>
              <div class="dropdown d-none d-md-flex">
                <a @click="unreadNotifications = 0" class="nav-link icon" data-toggle="dropdown">
                  <i class="fa fa-bell"></i>
                  <span v-if="unreadNotifications > 0" class="nav-unread"></span>
                </a>
                <div class="dropdown-menu dropdown-menu-right dropdown-menu-arrow">
                  <ul class="notif-list">
                    <li v-for="(n, index) in notifications.slice().reverse()" v-bind:key="index">
                      <div class="ml-5 mr-5">
                        <span :class="'avatar float-left mr-2 text-' + n.type">
                          <i v-if="n.type === 'success'" class="fa fa-check-circle"></i>
                          <i v-if="n.type === 'info'" class="fa fa-info-circle"></i>
                          <i v-if="n.type === 'warning'" class="fa fa-info-circle"></i>
                          <i v-if="n.type === 'danger'" class="fa fa-exclamation-circle"></i>
                        </span>
                        <div v-html="n.text"></div>
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
                  <p class="px-5 my-2 text-nowrap"><span class="text-primary">{{ socket.io.uri }}</span></p>
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
            Copyright © 2018 <a href="http://git.dualsight.org/remoffice-client" target="_blank">Remoffice Client</a>. Developed by <a href="http://profile.darkstack.org/redhart" target="_blank">Justin (Redhart) Etighe</a>. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
import ioClient from 'socket.io-client'
import appConfig from '../config'
import '../../node_modules/animate.css/animate.min.css'
import '../../node_modules/toastr/build/toastr.min.css'
import '../../node_modules/nprogress/nprogress.css'
import '../../node_modules/feathericon/build/css/feathericon.css'
import '../../node_modules/@icon/font-awesome/font-awesome.css'
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
      socket: {
        io: {
          uri: 'unavailable'
        }
      },
      notifications: [],
      unreadNotifications: 0,
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
    user (field) {
      if (field === 'privilegeName') {
        switch (JSON.parse(localStorage.getItem(appConfig.name + '_' + 'user'))['privilege']) {
          case 0:
            return 'User'
          case 1:
            return 'Administrator'
        }
      }
      return JSON.parse(localStorage.getItem(appConfig.name + '_' + 'user'))[field]
    },
    logout (notif) {
      localStorage.removeItem(appConfig.name + '_' + 'token')
      this.$router.push({name: 'loginView', params: {notification: notif}})
    },
    notifTime (dateObj) {
      return this.timeAgo(dateObj)
    },
    notify (notif) {
      notif.time = new Date()
      // this.showNotification(notif.title, notif.text, notif.type, notif.duration, notif.delay, false, true)
      notif.text = notif.text.replace('ON', '<span class="text-success">ON</span>')
      notif.text = notif.text.replace('OFF', '<span class="text-danger">OFF</span>')
      this.notifications.push(notif)
      this.unreadNotifications++
    },
    getMasterSwitch (id) {
      return this.masterSwitches.find((obj) => obj.id === id) ||
      { state: 0 }
    },
    switchToggle (e) {
      this.socket.emit('toggleSwitch', this.switches[e.target.id])
    },
    masterSwitchToggle (name) {
      this.socket.emit('toggleMasterSwitch', this.masterSwitches[name])
    },

    // reboot blackbox in `delay` seconds
    rebootBlackbox (delay) {
      this.socket.emit('rebootBlackbox', delay)
    },

    // shutdown blackbox in `delay` seconds
    shutdownBlackbox (delay) {
      this.socket.emit('shutdownBlackbox', delay)
    }
  },
  mounted () {
    const vm = this
    this.server = localStorage.getItem(appConfig.name + '_' + 'server')

    $('#headerMenuCollapse .nav-link').on('click', function () {
      $('#headerMenuCollapse').collapse('hide')
    })

    // establish connection to server
    this.socket = this.server === 'localhost' ? ioClient() : ioClient(this.server)

    // get server notifications and present to user
    this.socket.on('notification', function (notif) {
      vm.notify(notif)
    })

    // send auth token on connect
    this.socket.on('connect', function () {
      vm.socket.emit('authentication', {token: localStorage.getItem(appConfig.name + '_' + 'token')})
    })

    // initiate logout when auth is lost
    this.socket.on('unauthorized', function (err) {
      vm.logout({title: 'Session Destroyed', text: err.message, type: 'error'})
    })

    this.socket.on('disconnect', function () {
      vm.serverData.blackbox.status = 'disconnected'
      vm.cams = []
      vm.rooms = []
      vm.switches = []
      vm.masterSwitches = []
    })

    this.socket.on('serverData', function (data) {
      vm.serverData = data
    })

    this.socket.on('cams', function (data) {
      let c = {}

      for (let i = 0; i < data.length; i++) {
        c[data[i].id] = data[i]
        c[data[i].id].isActive = false
      }

      vm.cams = c
    })

    this.socket.on('rooms', function (data) {
      let o = {}

      for (let i = 0; i < data.length; i++) {
        o[data[i].id] = data[i]
      }

      vm.rooms = o
    })

    this.socket.on('switches', function (data) {
      let s = {}

      for (let i = 0; i < data.length; i++) {
        s[data[i].id] = data[i]
      }

      vm.switches = s
    })

    this.socket.on('masterSwitches', function (data) {
      let ms = {}

      for (let i = 0; i < data.length; i++) {
        ms[data[i].name] = data[i]
      }

      vm.masterSwitches = ms
    })

    this.socket.on('camUpdate', function (dataNode) {
      vm.cams[dataNode.id] = dataNode
    })
  },

  beforeDestroy () {
    this.socket.disconnect()
  }
}
</script>
