<template>
  <div class="panel-wrapper">
    <div id="sidebar">
      <div class="sidebar-content">
        <!-- <div class="sidebar">
          <!-- <div class="sidebar-header mb-4">
           <img :src="$store.state.managedService.ManagedService.secondaryLogo" width="92px" alt="">
          </div> -->
       <!--    <div v-if="!$store.state.managedService.selectedCustomer">
            <b-row>
              <b-col class="px-4">
                <b-input-group size="sm">
                  <b-form-input
                    v-model="filter"
                    type="search"
                    id="filterInput"
                    placeholder="Search"
                  ></b-form-input>
                  <b-input-group-append>
                    <b-button :disabled="!filter" @click="filter = ''"
                      >Clear</b-button
                    >
                  </b-input-group-append>
                </b-input-group>
              </b-col>
            </b-row>
            <b-row class="pl-3">
              <ul class="list-none pl-3">
                <p class="mt-5">Fillter by:</p>
                <li><a href="http://">All Views</a></li>
                <li><a href="http://">Date Created</a></li>
                <li><a href="http://">Last Modified</a></li>
                <li><a href="http://">Location</a></li>
                <li><a href="http://">Username</a></li>
                <li><a href="http://">Department</a></li>
                <li><a href="http://">Domain</a></li>
              </ul>
            </b-row>
            <hr />
            <b-row>
              <div class="text-center w-100">
                <p>New Customer</p>
                <nuxt-link to="/customers/create">
                  <b-button variant="primary"
                  >Add
                  <font-awesome-icon
                    :icon="['fas', 'plus']"
                    style="font-size:17px; color:#fff;"
                  />
                </b-button>
                </nuxt-link>
              </div>
            </b-row>
          </div>
        </div>
        <b-row class="pl-3">
          <div class="w-100" v-if="$store.state.managedService.selectedCustomer">
            <br />
            <ul class="list-none pl-3">
              <li class="my-3">
                <div class="row">
                  <div class="col-md-2">
                    <font-awesome-icon
                      :icon="['fas', 'building']"
                      style="font-size:17px; color:rgb(220, 132, 2);"
                    />
                  </div>
                  <div class="col-md-8">
                    {{ $store.state.managedService.selectedCustomer.name }}
                  </div>
                </div>
              </li>
              <li class="my-3">
                <div class="row">
                  <div class="col-md-2">
                    <font-awesome-icon
                      :icon="['fas', 'database']"
                      style="font-size:17px; color:#F44336;"
                    />
                  </div>
                  <div class="col-md-8">
                    {{ $store.state.managedService.selectedCustomer.dbName }}
                  </div>
                </div>
              </li>
              <li class="my-3">
                <div class="row">
                  <div class="col-md-2">
                    <font-awesome-icon
                      :icon="['fas', 'wifi']"
                      style="font-size:17px; color:#5bc0de;"
                    />
                  </div>
                  <div class="col-md-8">
                    {{ $store.state.managedService.selectedCustomer.emailDomain }}
                  </div>
                </div>
              </li>
              <li class="my-3">
                <div class="row">
                  <div class="col-md-2">
                    <font-awesome-icon
                      :icon="['fas', 'network-wired']"
                      style="font-size:17px; color:blue;"
                    />
                  </div>
                  <div class="col-md-8">
                    {{ $store.state.managedService.selectedCustomer.subDomain }}
                  </div>
                </div>
              </li>
            </ul>
          </div> -->
        </b-row>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  computed: {
    search: function () {
      // send to vuex store
      this.$store.dispatch('search/searchTableData', this.filter)
    }
  },
  data() {
    return {
      filter:''
      }
  }
}
</script>
<style scoped>
@import url('https://fonts.googleapis.com/css?family=Assistant&display=swap');

.list-none {
  list-style: none;
}

.w-100 {
  width: 100%;
}
.small-screen {
  display: none;
}
.small-screen button {
  position: relative;
  right: -202px;
  top: -38px;
  padding: 5px;
}
.panel-wrapper {
  width: 250px;
  background: #ff9800;
  position: sticky;
  border-right: 1px solid #ccc;
}

#sidebar .sidebar-header {
  padding: 10px 0px;
  border-bottom: 1px solid #ccc;
  text-align: center;
}
@media (max-width: 992px) {

  #sidebar {
    width: 250px;
    /* margin-top: 50px; */
  }
  .panel-wrapper {
    margin-left: -250px;
    transition: all 0.3s;
    z-index: 999999;
  }
  .button-wrapper {
    display: none;
  }
  .small-screen {
    display: block;
  }

  .sidebar-open {
    visibility: hidden;
  }

  #sidebarCollapse span {
    display: none;
  }
}
</style>
