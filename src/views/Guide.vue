<template>
  <div class="my-3 my-md-5">
    <div class="container">
      <div class="page-header">
        <h1 class="page-title ml-5">
          User Manual
        </h1>
      </div>
      <div class="row">
        <div class="col-lg-3 mb-4">
          <!-- Menu -->
          <div class="nav flex-column nav-pills list-group list-group-transparent mb-0" id="UserGuide-tab" role="tablist" aria-orientation="vertical">
            <a class="nav-link list-group-item list-group-item-action active" id="UserGuide-intro-tab" data-toggle="pill" href="#UserGuide-intro" role="tab" aria-controls="UserGuide-intro" aria-selected="true"><span class="icon mr-3"><i class="fa fa-flag"></i></span>Introduction</a>
            <a class="nav-link list-group-item list-group-item-action" id="UserGuide-switches-tab" data-toggle="pill" href="#UserGuide-switches" role="tab" aria-controls="UserGuide-switches" aria-selected="false"><span class="icon mr-3"><i class="fa fa-toggle-on"></i></span>Switches</a>
            <a class="nav-link list-group-item list-group-item-action" id="UserGuide-surveillance-tab" data-toggle="pill" href="#UserGuide-surveillance" role="tab" aria-controls="UserGuide-surveillance" aria-selected="false"><span class="icon mr-3"><i class="fa fa-eye"></i></span>Surveillance</a>
            <a class="nav-link list-group-item list-group-item-action" id="UserGuide-storage-tab" data-toggle="pill" href="#UserGuide-storage" role="tab" aria-controls="UserGuide-storage" aria-selected="false"><span class="icon mr-3"><i class="fa fa-folder-open"></i></span>Storage</a>
            <a class="nav-link list-group-item list-group-item-action" id="UserGuide-server-tab" data-toggle="pill" href="#UserGuide-server" role="tab" aria-controls="UserGuide-server" aria-selected="false"><span class="icon mr-3"><i class="fa fa-server"></i></span>Server</a>
          </div>
        </div>
        <div class="col-lg-9 order-lg-1">
          <div class="card">
            <div class="card-body">
              <div class="tab-content text-wrap p-lg-6" id="UserGuide-tabContent">
                <div class="tab-pane fade show active" id="UserGuide-intro" role="tabpanel" aria-labelledby="UserGuide-intro-tab">
                  <h2 class="mt-0 mb-4">Introduction</h2>
                  <p>Hello, I'm Redhart. This software is a copy of Remoffice.</p>
                  <p>I created Remoffice, an all-in-one suite for IoT-based automations to make for a painless setup of smart homes, smart offices and smart rooms.</p>
                </div>
                <div class="tab-pane fade" id="UserGuide-switches" role="tabpanel" aria-labelledby="UserGuide-switches-tab">
                  <h2 class="mt-0 mb-4">Switches Guide</h2>
                </div>
                <div class="tab-pane fade" id="UserGuide-surveillance" role="tabpanel" aria-labelledby="UserGuide-surveillance-tab">
                  <h2 class="mt-0 mb-4">Surveillance Guide</h2>
                </div>
                <div class="tab-pane fade" id="UserGuide-storage" role="tabpanel" aria-labelledby="UserGuide-storage-tab">
                  <h2 class="mt-0 mb-4">Storage Guide</h2>
                </div>
                <div class="tab-pane fade" id="UserGuide-server" role="tabpanel" aria-labelledby="UserGuide-server-tab">
                  <h2 class="mt-0 mb-4">Server Guide</h2>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Guide'
}
</script>
