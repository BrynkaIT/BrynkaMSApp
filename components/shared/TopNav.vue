<template>
  <div>
    <b-navbar toggleable="lg" type="dark" variant="dark">
      <b-navbar-brand>
        <a href="/dashboard">
          <img src="/img/brynka/BrynkaManager-logo-sm.png" width="125px" />
        </a>
      </b-navbar-brand>

      <b-navbar-toggle target="collapse" @click="toogleSideBar"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav right>
        <b-navbar-nav class="ml-auto">
          <li>
            <nuxt-link to="/dashboard" class="nav-link" >Dashboard</nuxt-link>
          </li>
          <li>
            <nuxt-link to="/customers" class="nav-link" >Customers</nuxt-link>
          </li>
          <li>
            <nuxt-link to="/internal" class="nav-link">Internal</nuxt-link>
          </li>
          <li>
            <nuxt-link to="/system" class="nav-link">System Settings</nuxt-link>
          </li>
        </b-navbar-nav>

        <!-- <b-navbar-nav class="ml-auto">
          <b-nav-item-dropdown right>
            <template v-slot:button-content>
              <span class="menu-icon">
                <img
                  v-if="
                    currentUser.imageUrl == '' || currentUser.imageUrl == null
                  "
                  style="max-width:32px; border-radius:360px;"
                  src="../../assets/images/avatar-icon-images-4.png"
                />
                <img
                  v-if="currentUser.imageUrl != ''"
                  style="max-width:32px; border-radius:360px;"
                  :src="currentUser.imageUrl"
                />
              </span>
              <span class="menu-title" v-if="currentUser">
                <i>{{ currentUser.firstName }} {{ currentUser.lastName }}</i>
              </span>
            </template>

      </b-collapse>
    </b-navbar>
    <div :class="{ overlay: sideBarOpen }" @click="overlayOff"></div>
  </div>
</template>

<script scoped>
const Cookie = process.client ? require('js-cookie') : undefined
import { mapGetters } from 'vuex'
import { mapState } from 'vuex'

export default {
  middleware: 'authenticated',
  computed: {
    ...mapState({
      customer: state => state.managedService,
      auth: state => state.auth,
      sideBarOpen: state => state.sideBarOpen

    }),
    ...mapGetters({
      isAuth: 'isAuthenticated'
    })
  },
  data(){
    return{
      open:false
    }
  },
  methods: {
    toogleSideBar(){
      this.open = !this.open
      this.$store.commit('toggleSideBar', this.open)
    },
    overlayOff(){
      this.$store.commit('toggleSideBar', false)
    },
    logout() {
      this.$store.dispatch('logOut')
      localStorage.clear()
      this.$router.push(`/`)
    }
  }
}
</script>

<style scoped>
.bg-dark {
  padding-left: 55px !important;
  padding-right: 55px !important;
}

.navbar-dark .navbar-brand {
  color: #fff;
}
.navbar-brand {
  display: inline-block;
  padding: 0px !important;
  margin-bottom: 13px !important;
  margin-right: 0 !important;
  line-height: inherit !important;
  white-space: nowrap !important;
}
#nav-collapse {
  margin-top: 3px;
}
.nav-link{
      display: -webkit-flex !important;
    display: flex !important;
    -webkit-align-items: center;
    align-items: center;
    white-space: nowrap;
    padding: 0.8rem 1.188rem;
    color: #fff !important;
    -webkit-transition-duration: 0.45s;
    -moz-transition-duration: 0.45s;
    -o-transition-duration: 0.45s;
    transition-duration: 0.45s;
    transition-property: color;
    -webkit-transition-property: color;
    height: 46px;
    padding-left: 30px;
    /* border-radius: 12px; */
}
.nav-link:hover{
    color: #fff !important;
    background:none !important;
    border-bottom: 4px solid#606162

}
.nuxt-link-active{
  color: #fff !important;
  /* background: #d08c28 !important; */
  border-bottom: 4px solid #ff9800
  }
.overlay {
  position: fixed; /* Sit on top of the page content */
  display: block; /* Hidden by default */
  width: 100%; /* Full width (cover the whole page) */
  height: 100%; /* Full height (cover the whole page) */
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0,0,0,0.5); /* Black background with opacity */
  z-index: 2; /* Specify a stack order in case you're using a different order for other elements */
  cursor: pointer; /* Add a pointer on hover */
}
</style>
