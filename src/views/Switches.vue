<template>
  <div class="my-3 my-md-5">
    <div class="container">
      <div class="page-header">
        <h1 class="page-title ml-5">
          Switches
        </h1>
      </div>
      <div class="row row-cards">
        <div v-if="$parent.masterSwitches.length < 1" class="col-12 mb-5 text-center bg-warning">
          <p class="text-center text-white my-3">Attempting to connect to switches...</p>
        </div>
        <div v-for="ms in $parent.masterSwitches" :key="ms.id" class="col-6 col-sm-4 col-lg-2">
          <div class="card">
            <div class="card-body p-3 text-center">
              <div class="h1 m-0 mt-2"><i :class="ms.icon"></i></div>
              <div class="text-muted mt-2 mb-2">{{ ms.title }}</div>
              <div class="form-group mt-4 mb-2">
                <label class="custom-switch">
                  <input type="checkbox" :name="ms.name" :id="ms.id" :value="ms.state ? 1 : 0" class="custom-switch-input" v-model="ms.state" @change="$parent.masterSwitchToggle(ms.name)">
                  <span class="custom-switch-indicator"></span>
                </label>
              </div>
            </div>
          </div>
        </div>
        <div class="col-12">
          <div class="card">
            <div class="card-header">
              <h3 class="card-title">Room Switches</h3>
            </div>
            <div class="table-responsive">
              <table class="table card-table table-vcenter text-nowrap">
                <thead>
                  <tr>
                    <th class="text">Infrastructure</th>
                    <th class="w-1">ID.</th>
                    <th class="text-center">State</th>
                    <th>Room Name</th>
                    <th>Room Location</th>
                  </tr>
                </thead>
                <tbody>
                    <tr v-for="s in $parent.switches" :key="s.id">
                      <td><span :class="'mr-5 ' + s.icon"></span> {{ s.description }}</td>
                      <td><span class="text-muted">{{ s.id }}</span></td>
                      <td class="text-center">
                        <div class="form-group mb-0">
                          <label class="custom-switch">
                            <input type="checkbox" name="option" :id="s.id" :value="s.state ? 1 : 0" class="custom-switch-input" v-model="s.state" @change="$parent.switchToggle">
                            <span class="custom-switch-indicator"></span>
                          </label>
                        </div>
                      </td>
                      <td>{{ $parent.rooms[s.Room_id].name }}</td>
                      <td>{{ $parent.rooms[s.Room_id].location }}</td>
                    </tr>
                    <tr v-if="$parent.switches.length < 1">
                      <td colspan="5">
                        <p></p>
                        <p class="text-center">Awaiting infrastructure...</p>
                      </td>
                    </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Power'
}
</script>
