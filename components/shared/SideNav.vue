<template>
  <div class="sidenav-wrapper" :class="{ isopen: sideBarOpen }">
    <nav id="sidebar">

      <div class="sidebar-content">
        <div class="sidebar ">
          <div class="sidebar-header">
            <b-nav vertical v-if="auth">
            <a class="nav-link" href="#" v-b-toggle.accordion-user>
              <span class="menu-icon">
                <b-avatar v-if="!currentUser.imageUrl"></b-avatar>
                <b-avatar v-if="currentUser.imageUrl" variant="primary" :src="`${baseUrl}${currentUser.imageUrl}`"></b-avatar>
              </span>
              <span class="menu-title" v-if="currentUser">
                <i>{{ currentUser.firstName }} {{ currentUser.lastName }}</i>
              </span>
              <font-awesome-icon
                :icon="['fas', 'caret-down']"
                style="color:#a3a3a3;margin-left:8%;"
              />
            </a>

            <b-collapse
              id="accordion-user"
              accordion="my-accordion"
              role="tabpanel"
              class="mx-auto"
            >
              <div>
                <li>
                  <a
                    @click="goTo('preferences')"
                    class="nav-link"
                    :class="{ active: page == 'preferences' }"
                  >
                    <span class="menu-title">Preferences</span>
                  </a>
                </li>
                <b-nav-item @click="logout" class="sub-link">Log Out</b-nav-item>
              </div>
            </b-collapse>
          </b-nav>
          </div>
          <br />


          <ul class="list-unstyled components">
            <li>
              <a @click="goTo('dashboard')" class="nav-link"  :class="{ active: page == 'dashboard' }">
                <span class="menu-icon" :class="{ active: page == 'dashboard' }">
                  <font-awesome-icon
                    :icon="['fas', 'tachometer-alt']"
                    style="font-size: 17px; color:#5bc0de;"
                  />
                </span>
                <span class="menu-title">Dashboard</span>
              </a>
            </li>
            <li>
              <a @click="goTo('customers')" class="nav-link"  :class="{ active: page == 'customers' }">
                <span class="menu-icon" :class="{ active: page == 'customers' }">
                  <font-awesome-icon
                    :icon="['fas', 'project-diagram']"
                    style="font-size: 17px; color:#fd7e14;"
                  />
                </span>
                <span class="menu-title">Customers</span>
              </a>
            </li>
            <li>
              <a @click="goTo('internal')" class="nav-link"  :class="{ active: page == 'internal' }">
                <span class="menu-icon" :class="{ active: page == 'internal' }">
                  <font-awesome-icon
                    :icon="['fas', 'list']"
                    style="font-size: 17px; color:#28a745;"
                  />
                </span>
                <span class="menu-title">Internal</span>
              </a>
            </li>
            <li>
              <a @click="goTo('system')" class="nav-link"  :class="{ active: page == 'system' }">
                <span class="menu-icon" :class="{ active: page == 'system' }">
                  <font-awesome-icon
                    :icon="['fas', 'cogs']"
                    style="font-size: 17px; color:#e83e8c;"
                  />
                </span>
                <span class="menu-title">System</span>
              </a>
            </li>

          </ul>

        </div>
      </div>
    </nav>
  </div>
</template>

<script>


import { mapState, mapGetters } from 'vuex'

export default {

  props: ['page', 'app'],
  components: {

  },
  computed: {
    ...mapState({
      auth: state => state.auth.auth,
      customer: state => state.customer,
      sideBarOpen: state => state.sideBarOpen
    }),
     baseUrl(){
      return process.env.baseURL
    }
  },

  data() {
    return {
      isOpen: false,
      securityRole:null,
      currentUser:''
    }
  },
  mounted() {
    this.currentUser = JSON.parse(localStorage.getItem('managerApp_currentUser'))
    this.loading = false
  },
  methods: {
   logout () {
      this.$store.dispatch('auth/logOut')
      localStorage.clear()
      this.$router.push(`/`)
    },
      goTo(page) {
      this.$router.push(`/${page}`)
      this.$store.commit('toggleSideBar', false)
    }
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css?family=Assistant&display=swap');

.sidenav-wrapper {
  margin-left: -250px;
  width: 250px;
  padding: 15px;
  background-color: #343a40 !important;
}

#sidebar .sidebar-header {
  padding: 10px 0px;
  border-bottom: 1px solid #ccc;
  text-align: center;
}

#sidebar ul p {
  color: #fff;
  padding: 10px;
}

#sidebar > button {
  display: none;
}

.sidebar .nav-link {
  display: -webkit-flex !important;
  display: flex !important;
  -webkit-align-items: center;
  align-items: center;
  white-space: nowrap;
  padding: 0.8rem 1.188rem;
  color: #a3a3a3 !important;
  -webkit-transition-duration: 0.45s;
  -moz-transition-duration: 0.45s;
  -o-transition-duration: 0.45s;
  transition-duration: 0.45s;
  transition-property: color;
  -webkit-transition-property: color;
  height: 46px;
  padding-left:30px
}
a[data-toggle='collapse'] {
  position: relative;
}
.button-icon {
  font-size: 17px;
}
.menu-title {
  color: inherit;
  display: inline-block;
  font-size: 0.9375rem;
  line-height: 1;
  vertical-align: middle;
}
.menu-title h5 {
  position: relative;
  top: 4px;
}
.footer {
  color: #fff;
  position: absolute;
  bottom: 30px;
  width: 100%;
  text-align: center;
}

/* .footer p {
  color:#fff;
  text-align:center
} */
.footer ul li a {
  color: #fff;
  text-align: center;
}
/* ---------------------------------------------------
    MEDIAQUERIES
----------------------------------------------------- */

@media (max-width: 1000px) {
  #sidebar {
    width: 200px;
    /* margin-top: 50px; */
  }
  .sidenav-wrapper {
    /* margin-left: -250px; */
    transition: all 0.3s;
    z-index: 999999;
     position: absolute;
  height:100%;
  }
  #sidebar > button {
    position: absolute;
    top: 5px;
    left: 260px;
    display: block;
  }

  .sidebar-open {
    visibility: hidden;
  }

  .sidenav-wrapper.isopen {
    margin-left: 0;
    border-right: 1px solid#495057;
    transition: all 0.3s;
  }

  #sidebarCollapse span {
    display: none;
  }
}
@media print {
  .sidenav-wrapper{
    display:none;
  }
}

@media(max-width:992px){

}
.sidebar .nav-link:hover, .menu-icon:hover{
  color: #fff !important;
  background: #d38005 !important;
  border-radius: 12px;

}
.sidebar .nav-link.active{
  color: #fff !important;
  background: none !important;
  border-radius: 12px;
  border:none;
}
</style>
