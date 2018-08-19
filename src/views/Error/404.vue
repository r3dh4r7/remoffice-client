<template>
  <div class="error page">
    <div class="page-content">
      <div class="container text-center px-6">
        <div class="display-1 text-muted mb-5"><i class="si si-exclamation"></i> 404</div>
        <h1 class="h2 mb-3">Err... There's nothing to see here...</h1>
        <div class="row">
          <div class="col-xl-6 col-lg-6 col-md-10 col-sm-12 col-xs-10 mx-auto">
            <p class="h4 text-muted font-weight-normal mb-7">{{ appConfig.name }} encountered a route error. If you believe you came to the right place, please report this to the administrator, otherwise just return to the previous page and be awesome!</p>
          </div>
        </div>
        <a class="btn btn-primary" href="javascript:history.back()">
          <i class="fa fa-arrow-left mr-2"></i>Go back
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import appConfig from '../../config'

export default {
  name: 'Error404',
  data () {
    return {
      appConfig: appConfig
    }
  }
}
</script>
