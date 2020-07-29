<template>
  <div class="content-container">
    <SideNav page="dashboard" app="home"></SideNav>
    <div class="content-right">
      <div class="row">
        <div class="col summary">
          <div class="card ">
            <div class="card-body">
              <div class="row">
                <div class="col-md-4">
                  <font-awesome-icon
                    :icon="['fas', 'dolly-flatbed']"
                    style="font-size:30px;
                  color:#07c5fd;position: relative; top: 10px;"
                  />
                </div>
                <div class="col">
                  <h5 >Post</h5>
                  <p >2,345</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col summary">
          <div class="card">
            <div class="card-body">
              <div class="row">
                <div class="col-md-4">
                  <font-awesome-icon
                    :icon="['fas', 'mail-bulk']"
                    style="font-size:30px;
                  color:#ff9800;position: relative; top:10px;"
                  />
                </div>
                <div class="col">
                  <h5 >Mail Center</h5>
                  <p >4,061</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col summary">
          <div class="card">
            <div class="card-body">
              <div class="row">
                <div class="col-md-4">
                  <font-awesome-icon
                    :icon="['fas', 'running']"
                    style="font-size:30px;
                  color:#d7ec05;position: relative;  top: 10px;"
                  />
                </div>
                <div class="col">
                  <h5 >Mail Run</h5>
                  <p >26</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col summary">
          <div class="card">
            <div class="card-body">
              <div class="row">
                <div class="col-md-4">
                  <font-awesome-icon
                    :icon="['fas', 'hand-holding']"
                    style="font-size:30px;
                  color:#e91e63;position: relative;top:10px;"
                  />
                </div>
                <div class="col">
                  <h5>Delivered</h5>
                  <p>40</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <br />
      <div class="row">
        <div class="col-md-12">
          <div class="card">
            <div class="card-body">
              <h5 class="card-title">Received - 2019</h5>
              <line-chart></line-chart>
            </div>
          </div>
        </div>
      </div>
      <br />
      <div class="row">
        <div class="col-md-6">
          <div class="card">
            <div class="card-body">
              <h5 class="card-title">Received Items</h5>
              <Bar-chart></Bar-chart>
            </div>
          </div>
        </div>
        <div class="col-md-6">
          <div class="card">
            <div class="card-body">
              <h5 class="card-title">Delivered</h5>
              <Bubble-Chart></Bubble-Chart>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import SideNav from '@/components/shared/SideNav.vue'
import LineChart from '@/components/LineChart'
import BarChart from '@/components/BarChart'
import BubbleChart from '@/components/BubbleChart'

export default {
  //  middleware: ['authenticated', 'permissions'],
  // transition: "tile",
  // page:'admin',
  // app:'admin',
  layout:'main',
  components: {
    LineChart,
    BarChart,
    BubbleChart,
    SideNav,
  },
}
</script>

<style scoped>

.section-label {
  font-size: 13px;
  font-weight: 600;
}

.custom-control-input:checked ~ .custom-control-label::before {
  color: #fff;
  border-color: #ffeb3b !important;
  background-color: #4caf50 !important;
}
@media (max-width: 992px) {
  /* .content-right{
    margin-top:50px;
  } */
  .row{
    padding-left:20px;
    padding-right:20px;
  }
  .col {
   padding:0px;
   text-align:center;
  }
  .col.summary h5{
    font-size: 1rem !important;
    margin-bottom: 0 !important
  }

  .col.summary p{
    font-size: .85rem !important;
  }
  svg{
    font-size: 1.5rem !important;
  }

}

@media (max-width: 768px) {
  .form {
    width: 100% !important;
  }
  svg{
    font-size: 1.25rem !important;
    margin-bottom: 5px !important;
  }
  .summary .card-body{
    padding: 0rem !important;
  }

}


</style>
