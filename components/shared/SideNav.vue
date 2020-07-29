<template>
  <div class="sidenav-wrapper" :class="{ isopen: sideBarOpen }">
    <nav id="sidebar">

      <div class="sidebar-content">
        <div class="sidebar ">
          <div class="sidebar-header small-screens-only">
            <!-- Module Switcher -->
            <module-switcher :app="app"/>
            <!-- End Module Switcher -->
          </div>
          <br class="small-screens-only"/>
          <!-- User Profile -->
          <Avatar   />
          <!-- End User Profile -->
          <br />

          <!-- Module links/tabs -->

          <ul class="list-unstyled components">
            <div v-if="app == 'customers'">
              <NavLink
                v-if="navLink.appModule == 'customers'"
                v-for="navLink in navLinks"
                :key="navLink.navigateToPage"
                :activeLink="navLink.navigateToText.toLowerCase()"
                :page="page"
                :appModule="navLink.appModule"
                :navigateToPage="navLink.navigateToPage"
                :navigateToText="navLink.navigateToText"
                :fontAwesomeIcon="navLink.fontAwesomeIcon"
                :fontAwesomeStyle="navLink.fontAwesomeStyle"
              ></NavLink>

              <DropdownNav
                v-if="dropdownNavs.length > 0"
                :appModule="dropdownNav.appModule"
                v-for="dropdownNav in dropdownNavs"
                :key="dropdownNav.dropdownText"
                :dropdownText="dropdownNav.dropdownText"
                :dropdownIcon="dropdownNav.dropdownIcon"
                :dropdownIconStyle="dropdownNav.dropdownIconStyle"
                :nestedLinks="dropdownNav.nestedLinks"
              ></DropdownNav>
            </div>

            <!-- Receiving -->
            <div v-if="app == 'operations'">
              <NavLink
                v-if="navLink.appModule == 'operations'"
                v-for="navLink in navLinks"
                :key="navLink.navigateToPage"
                :activeLink="navLink.navigateToText.toLowerCase()"
                :page="page"
                :appModule="navLink.appModule"
                :navigateToPage="navLink.navigateToPage"
                :navigateToText="navLink.navigateToText"
                :fontAwesomeIcon="navLink.fontAwesomeIcon"
                :fontAwesomeStyle="navLink.fontAwesomeStyle"
              ></NavLink>
            </div>
            <!-- End Receiving -->

            <!-- <li>
              <nuxt-link to="/" class="nav-link">
                <span class="menu-icon">
                  <font-awesome-icon
                    :icon="['fas', 'reply']"
                    style="font-size: 17px; color:#fff;"
                  />
                </span>
                <span class="menu-title">Brynka.com</span>
              </nuxt-link>
            </li>
            <li>
              <a class="nav-link">
                <span class="menu-icon">
                  <font-awesome-icon
                    :icon="['fas', 'question-circle']"
                    style="font-size: 17px; color:#fff;"
                  />
                </span>
                <span class="menu-title">Support</span>
              </a>
            </li> -->
          </ul>
          <!-- End Module links/tabs -->

        </div>
      </div>
    </nav>
  </div>
</template>

<script>
import ModuleSwitcher from '@/components/shared/ModuleSwitcher.vue'
import DropdownNav from '@/components/shared/DropdownNavLink.vue'
import NavLink from '@/components/shared/NavLink.vue'
import Avatar from '@/components/shared/Avatar.vue'
import { mapGetters } from 'vuex'
import { mapState } from 'vuex'

export default {
  // middleware: 'authenticated',
  props: ['page', 'app'],
  components: {
    ModuleSwitcher,
    Avatar,
    NavLink,
    DropdownNav
  },
  computed: {
    ...mapState({
      auth: state => state.auth,
      customer: state => state.customer,
      currentUser: state => state.managedService,
      sideBarOpen: state => state.sideBarOpen
    })
  },
  //  async created(){
  //   const permsId = currentUser.securityRole
  //   const { data } = await this.$axios.get(`/securityRole/${permsId}`)
  //   this.securityRole = data.securityRole
  // },
  data() {
    return {
      isOpen: false,
      securityRole:null,
      navLinks: [
        {
          appModule: 'home',
          navigateToPage: 'dashboard',
          navigateToText: 'Dashboard',
          fontAwesomeIcon: ['fas', 'tachometer-alt'],
          fontAwesomeStyle: { color: '#5bc0de' }
        },
        // {
        //   appModule: 'admin',
        //   navigateToPage: 'admin/reports',
        //   navigateToText: 'Reports',
        //   fontAwesomeIcon: ['fas', 'list'],
        //   fontAwesomeStyle: { color: '#28a745' }
        // },
        // {
        //   appModule: 'admin',
        //   navigateToPage: 'admin/history',
        //   navigateToText: 'History',
        //   fontAwesomeIcon: ['fas', 'history'],
        //   fontAwesomeStyle: { color: '#e91e63' }
        // },

        {
          appModule: 'customers',
          navigateToPage: 'customers',
          navigateToText: 'Customers',
          fontAwesomeIcon: ['fas', 'barcode'],
          fontAwesomeStyle: { color: '#76ef04;' }
        },
        {
          appModule: 'receiving',
          navigateToPage: 'receiving/verify',
          navigateToText: 'Verify',
          fontAwesomeIcon: ['fas', 'list'],
          fontAwesomeStyle: { color: '#ed9c28' }
        },
        {
          appModule: 'receiving',
          navigateToPage: 'receiving/deliver',
          navigateToText: 'Deliver',
          fontAwesomeIcon: ['fas', 'dolly'],
          fontAwesomeStyle: { color: '#d53f3a' }
        },
        {
          appModule: 'receiving',
          navigateToPage: 'receiving/outbound',
          navigateToText: 'Outbound',
          fontAwesomeIcon: ['fas', 'shipping-fast'],
          fontAwesomeStyle: { color: '#5392dc' }
        },
        {
          appModule: 'receiving',
          navigateToPage: 'receiving/history',
          navigateToText: 'History',
          fontAwesomeIcon: ['fas', 'history'],
          fontAwesomeStyle: { color: '#ffd647' }
        }
      ],
      dropdownNavs: [
        {
          appModule: 'admin',
          dropdownText: 'Settings',
          dropdownIcon: ['fas', 'cogs'],
          dropdownIconStyle: { color: '#9c27b0' },
          nestedLinks: [
            {
              navigateToPage: 'admin/buildings',
              navigateToText: 'Buildings'
            },
            {
              navigateToPage: 'admin/carriers',
              navigateToText: 'Carriers'
            },
            {
              navigateToPage: 'admin/contacts',
              navigateToText: 'Contacts'
            },
            {
              navigateToPage: 'admin/departments',
              navigateToText: 'Departments'
            },
            {
              navigateToPage: 'admin/floors',
              navigateToText: 'Floors'
            },
            {
              navigateToPage: 'admin/locations',
              navigateToText: 'Locations'
            },
            {
              navigateToPage: 'admin/securityRoles',
              navigateToText: 'Security Roles'
            },
            {
              navigateToPage: 'admin/users',
              navigateToText: 'Users'
            }
          ]
        }
      ]
    }
  },
  // methods: {
  //   openSidebar() {
  //     this.isOpen = !this.isOpen
  //   }
  // }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css?family=Assistant&display=swap');
.small-screens-only{
  display:none
}
.sidenav-wrapper {
  width: 250px;
  padding: 15px;

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
    margin-left: -250px;
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
.sidebar .nav-link:hover, .nav-link.active, .menu-icon:hover{
  color: #fff !important;
  background: #000 !important;
}
@media(max-width:992px){
  .small-screens-only{
    display:block
  }
}
</style>
