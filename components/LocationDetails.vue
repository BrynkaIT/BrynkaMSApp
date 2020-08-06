<template>
  <div>
    <div class="top-panel mt-3">
      <div class="container">
        <div class="row">
        <div style="font-size: 3rem;">
          <b-icon icon="flag" class="rounded-circle border p-2" variant="dark"></b-icon>
        </div>
        <h3 class="mt-3 ml-1">{{customer.name}} - {{ location.name }}</h3>
      </div>
      </div>
    </div>

    <div class="content-container">
        <div class="side-panel">
              <nav class="nav flex-column nav-pills nav-gap-y-1">
                  <a
                    href="#"
                    @click="tabIndex = 0"
                    class="nav-item nav-link has-icon nav-link-faded"
                    :class="{ active: tabIndex == 0 }"
                  >
                    <b-icon icon="cone-striped" font-scale="1.5" class="mr-2"></b-icon
                    >Departments
                  </a>
                  <a
                    href="#"
                    @click="tabIndex = 1"
                    class="nav-item nav-link has-icon nav-link-faded"
                    :class="{ active: tabIndex == 1 }"
                  >
                    <b-icon icon="building" font-scale="1.5" class="mr-2"></b-icon
                    >Buildings
                  </a>
                  <a
                    href="#"
                    @click="tabIndex = 2"
                    class="nav-item nav-link has-icon nav-link-faded"
                    :class="{ active: tabIndex == 2 }"
                  >
                    <b-icon
                      icon="arrows-expand"
                      font-scale="1.5"
                      class="mr-2"
                    ></b-icon
                    >Floors
                  </a>

                </nav>

        </div>
      <div class="content-right">
        <div class="container">
          <b-tabs v-model="tabIndex" small >
          <b-tab title="Departments">
            <b-card  class="text-center" v-for="(dep, index) in departments" >
              <b-card-text>{{ dep}}</b-card-text>
            </b-card>
          </b-tab>
          <b-tab title="Buildings">
            I'm the second tab
            <b-card>I'm the card in tab</b-card>
          </b-tab >
          <b-tab title="Floors">I'm the last tab</b-tab>
      </b-tabs>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
computed: {
    ...mapState({
      // locations: state => state.locations.locations,
      formToOpen: state => state.formToOpen,
      customer: state => state.formToOpen.data.customer,
      location: state => state.formToOpen.data,
      departments: state => state.formToOpen.data.departments,
      building: state => state.formToOpen.data.building,
      usaStates: state =>state.usStates.usaStates
    })
  },
   data() {
      return {
        tabIndex: 0
      }
    }
}
</script>

<style >
@import url('https://fonts.googleapis.com/css?family=Assistant&display=swap');
.small-screens-only{
  display:none
}
.top-panel{
  width:100%;
  height:75px;
  background:#fff !important;
  border-bottom:1px solid #ccc !important
}
.side-panel {
  width: 200px !important;
  padding: 15px !important;
  background:#fff !important;


}
.side-panel .nav-link{
color:#000 !important;
}
.side-panel .nav-link:hover {
    color: #343a40 !important;
    background: #ecf0f5 !important;
}
.side-panel .nav-link.active {
    color: #ecf0f5 !important;
    background:  #343a40 !important;
}
.content-right .nav-tabs .nav-link.active, .content-right .nav-link:active,.content-right .nav-tabs .nav-item.show .nav-link {
    color: #fff !important;
    background-color: #343a40 !important;
}

@media (max-width: 1000px) {

  .side-panel {
    margin-left: -250px;
    transition: all 0.3s;
    z-index: 999999;
     position: absolute;
  height:100%;
  }
}
@media print {

  .side-panel{
    display:none;
  }
}

</style>
