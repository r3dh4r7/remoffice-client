<template>
  <router-view></router-view>
</template>

<script>
import '../../node_modules/animate.css/animate.min.css'
import '../../node_modules/toastr/build/toastr.min.css'
import '../../node_modules/nprogress/nprogress.css'
import '../../node_modules/feathericon/build/css/feathericon.css'
import '../../node_modules/@fortawesome/fontawesome-free/css/all.min.css'
import '../assets/css/dashboard.css'
require('bootstrap')

export default {
  name: 'MainLayout'
}
</script>
