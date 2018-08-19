<template>
  <div class="page">
    <div class="page-single">
      <div class="container">
        <div class="row">
          <div class="col col-login mx-auto">
            <div class="text-center mb-6">
              <img src="static/img/logo/main.png" class="h-6" alt="">
            </div>
            <form class="card" @submit.prevent="login">
              <div class="card-body p-6">
                <div class="card-title">Login</div>
                <div class="form-group">
                  <label class="form-label"><i class="fa fa-passport mr-3"></i> E-mail</label>
                  <input type="email" class="form-control" id="Email" aria-describedby="usernameHelp" placeholder="Enter e-mail" v-model="fields.email">
                </div>
                <div class="form-group">
                  <label class="form-label"><i class="fa fa-key mr-2"></i> Password</label>
                  <input type="password" class="form-control" id="Password" placeholder="Enter password" v-model="fields.password">
                </div>
                <div class="form-group">
                  <label class="form-label"><i class="fa fa-server mr-2"></i> Server</label>
                  <input type="text" class="form-control" id="Server" v-model="fields.server" onfocus="if (this.value === 'localhost') this.value = ''" onblur="if (this.value === '') this.value = 'localhost'">
                </div>
                <div class="form-footer">
                  <button type="submit" class="btn btn-primary btn-block">Sign In</button>
                </div>
              </div>
            </form>
            <div class="row">
              <div class="col-6 text-left text-muted">
                <a href="/"><i class="fa fa-arrow-left"></i> Home</a>
              </div>
              <div class="col-6 text-right text-muted">
                <a href="#" @click.prevent="forgetServer">Forget Server <i class="fa fa-times"></i></a>
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
  name: 'Login',
  data () {
    return {
      serverVar: appConfig.name + '_' + 'server',
      tokenVar: appConfig.name + '_' + 'token',
      userVar: appConfig.name + '_' + 'user',
      fields: {
        email: '',
        password: '',
        server: 'localhost',
        rememberMe: 1
      }
    }
  },
  methods: {
    forgetServer () {
      localStorage.removeItem(this.serverVar)
      this.fields.server = 'localhost'
      this.showNotificationAlt('Server Config Erased', '', 'info', 2000)
    },

    login () {
      const vm = this
      let api = this.fields.server === 'localhost'
        ? window.location.origin + '/auth'
        : window.location.protocol + '//' + vm.fields.server + '/auth'

      localStorage.setItem(this.serverVar, vm.fields.server)

      axios.post(api, {email: vm.fields.email, password: vm.fields.password})
        .then(function (response) {
          if (!response.data.error) {
            localStorage.setItem(vm.tokenVar, response.data.token)
            localStorage.setItem(vm.userVar, JSON.stringify(response.data.user))
            vm.clearNotifications()
            vm.showNotificationAlt('Login Successful', response.data.message, 'success', 3000)
            setTimeout(() => {
              vm.$router.push({path: 'app'})
            }, 3000)
          } else {
            localStorage.removeItem(vm.tokenVar)
            vm.showNotificationAlt('Error', response.data.message, 'error', 3000)
          }
        })
        .catch(function () {
          localStorage.removeItem(vm.tokenVar)
          vm.showNotificationAlt('Error', 'Server unreachable.', 'error', 3000)
        })
    }
  },
  mounted () {
    const savedServer = localStorage.getItem(this.serverVar)

    if (savedServer) {
      this.fields.server = savedServer
    }

    if (this.$route.params.notification) {
      this.showNotificationAlt(this.$route.params.notification.title,
        this.$route.params.notification.text,
        this.$route.params.notification.type)
    }
  }
}
</script>
