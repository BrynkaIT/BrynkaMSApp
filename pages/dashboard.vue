<template>
  <div class="content-container">
    <SideNav page="dashboard" app="dashboard"></SideNav>
    <div class="content-right">
      <div class="row">
        <div class="col">
          <div class="card ">
            <div class="card-body">
              <div class="row">
                <div class="col-md-4">
                 <b-icon icon="people" scale="3" variant="primary" aria-hidden="true" class="" style="margin:20px"></b-icon>
                </div>
                <div class="col">
                  <h5 class="summary-heading">Users</h5>
                  <p class="summary-text">2,345</p>
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
                  <b-icon icon="bezier" scale="3" variant="primary" aria-hidden="true" class="" style="margin:20px"></b-icon>

                </div>
                <div class="col">
                  <h5 >Customers</h5>
                  <p >861</p>
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
                  <b-icon icon="box" scale="3" variant="primary" aria-hidden="true" class="" style="margin:20px"></b-icon>
                </div>
                <div class="col">
                  <h5 >Packages</h5>
                  <p >26,203</p>
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
                  <b-icon icon="graph-up" scale="3" variant="primary" aria-hidden="true" class="" style="margin:20px"></b-icon>
                </div>
                <div class="col">
                  <h5>Sales</h5>
                  <p>540</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-md-8">
          <div class="card">
            <div class="card-body">
              <h5 class="card-title">Received - 2019</h5>
              <line-chart></line-chart>
            </div>
          </div>
        </div>
        <div class="col-md-4">
          <div class="card">
            <div class="card-body">
              <h5 class="card-title">Received - 2019</h5>
              <DoughnutChart></DoughnutChart>
            </div>
          </div>
        </div>
      </div>
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
import DoughnutChart from '@/components/DoughnutChart'

export default {
  middleware: ['authenticated'],
  // transition: "tile",
  components: {
    LineChart,
    BarChart,
    BubbleChart,
    DoughnutChart,
    SideNav,
  },
  data(){
    return{

    }
  }
}
</script>

<style scoped>

.card{
  box-shadow: 0 4px 20px 1px rgba(0,0,0,.06), 0 1px 4px rgba(0,0,0,.08);
  border: 0;
}

@media (max-width: 992px) {

  /* .row{
    padding-left:20px;
    padding-right:20px;
  }
  .col {
   padding:0px;
   text-align:center;
  } */
  .summary-heading {
    font-size: 1rem !important;
    font-weight:200!important;
    margin-bottom: 0 !important;
    color:#818182 !important;
  }

  .summary-text{
    font-weight:200!important;
    font-size: .85rem !important;
    color:#818182 !important;
  }
  /* svg{
    font-size: 1.5rem !important;
  } */

}

@media (max-width: 768px) {


}


</style>
