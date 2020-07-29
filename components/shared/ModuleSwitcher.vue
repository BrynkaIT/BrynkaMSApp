<template>
<div v-if="user">
   <b-nav vertical >
    <a class="nav-link" v-b-toggle.accordion-module>
      <span class="menu-icon">
        <img src="../../assets/images/bryka_b.png" width="32px" alt />
      </span>
      <span class="menu-title" v-if="app">
        <h6>{{ app.toUpperCase() }}</h6>
      </span>
      <font-awesome-icon
        :icon="['fas', 'caret-down']"
        style="color:#a3a3a3;margin-left:6%;"
      />
    </a>

    <b-collapse
      id="accordion-module"
      accordion="my-accordion"
      role="tabpanel"
      class="mx-auto"
    >
      <div>
        <b-nav-item to="/home" class="sub-link">
         <span class="menu-icon">
          <font-awesome-icon
            :icon="['fas', 'home']"
            style="font-size:17px; color:#5bc0de;"
          />

        </span>
        <span class="menu-title">Home</span>
       </b-nav-item >
       <b-nav-item to="/customers" class="sub-link" >
          <span class="menu-icon">
          <font-awesome-icon
            :icon="['fas', 'user-lock']"
            style="font-size:15px; "
          />
        </span>
        <span class="menu-title">Customers</span>
        </b-nav-item >
        <b-nav-item to="/sales" class="sub-link" >
          <span class="menu-icon">
          <font-awesome-icon
            :icon="['fas', 'user-lock']"
            style="font-size:15px; "
          />
        </span>
        <span class="menu-title">Sales</span>
        </b-nav-item >
        <b-nav-item to="/operations" class="sub-link" >
          <span class="menu-icon">
          <b-icon icon="upc-scan"></b-icon>
        </span>
        <span class="menu-title">Operations</span>
         </b-nav-item >
        <b-nav-item to="/system" class="sub-link" >
          <span class="menu-icon">
            <b-icon icon="box-seam"></b-icon>
          </span>
         <span class="menu-title"> System</span>
         </b-nav-item >

      </div>
    </b-collapse>
  </b-nav>
</div>

</template>

<script>
import { mapState } from 'vuex'
// import { mapGetters } from 'vuex'

export default {
  props: ['app', 'page'],
  computed: {
    ...mapState({
    customer : state => state.managedService,
    user: state => state.currentUser,
    }),

  },

  data(){
    return{
      securityRole:null
    }
  }
}
</script>

<style></style>
