<template>
  <div>
    <b-navbar toggleable="lg" type="dark" variant="dark">
      <b-navbar-brand>
        <nuxt-link to="/home">
          <img src="/img/brynka/BrynkaManager-logo-sm.png" width="125px" />
        </nuxt-link>
      </b-navbar-brand>

      <b-navbar-toggle @click="toogleSideBar"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav right>
        <b-navbar-nav class="ml-auto">
          <li>
            <nuxt-link to="/customers" class="nav-link">Customers</nuxt-link>
          </li>
          <li>
            <nuxt-link to="/sales" class="nav-link">Sales</nuxt-link>
          </li>

          <b-nav-item-dropdown
            id="my-nav-dropdown"
            text="Operations"
            toggle-class="nav-link-custom"
            left
          >
            <b-dropdown-item to="/operations/tech">Tech</b-dropdown-item>
            <b-dropdown-item to="/operations/dev">Development</b-dropdown-item>
            <b-dropdown-divider>Customer Service</b-dropdown-divider>
          </b-nav-item-dropdown>
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

            <div class="pl-4 pr-4">
                <span>
                  <b-icon icon="building" scale="2" variant="primary"></b-icon>
                </span >
                <span class="ml-2">{{ customer.name | capFirstChar }}</span>
            </div>
            <b-dropdown-divider></b-dropdown-divider>
            <b-dropdown-item to="preference">Preferences</b-dropdown-item>
            <b-dropdown-item @click="logout">Sign Out</b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav> -->
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script>
const Cookie = process.client ? require('js-cookie') : undefined
import { mapGetters } from 'vuex'
import { mapState } from 'vuex'

export default {
  middleware: 'authenticated',
  props: ['page'],
  computed: {
    ...mapState({
      customer: state => state.managedService,
      auth: state => state.auth,
      currentUser: state => state.currentUser

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
    logout() {
      this.$store.dispatch('logOut')
      localStorage.clear()
      this.$router.push(`/`)
    }
  }
}
</script>

<style>
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
</style>
