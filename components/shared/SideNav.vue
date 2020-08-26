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
            <!-- Home -->
            <li>
              <nuxt-link to="/dashboard" class="nav-link"  :class="{ active: page == 'dashboard' }">
                <span class="menu-icon" :class="{ active: page == 'dashboard' }">
                  <font-awesome-icon
                    :icon="['fas', 'tachometer-alt']"
                    style="font-size: 17px; color:#5bc0de;"
                  />
                </span>
                <span class="menu-title">Dashboard</span>
              </nuxt-link>
            </li>
            <!-- end Home -->
            <!-- Customer Links -->
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

              <!-- <DropdownNav
                v-if="dropdownNavs.length > 0"
                :appModule="dropdownNav.appModule"
                v-for="dropdownNav in dropdownNavs"
                :key="dropdownNav.dropdownText"
                :dropdownText="dropdownNav.dropdownText"
                :dropdownIcon="dropdownNav.dropdownIcon"
                :dropdownIconStyle="dropdownNav.dropdownIconStyle"
                :nestedLinks="dropdownNav.nestedLinks"
              ></DropdownNav> -->
            </div>
            <!-- End Customer Links -->
            <!-- Sales Links -->
            <div v-if="app == 'customer'">
              <NavLink
                v-if="navLink.appModule == 'customer'"
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
            <!-- End Sales Links -->
            <!-- Operations -->
            <!-- <div v-if="app == 'system'">
              <NavLink
                v-if="navLink.appModule == 'system'"
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
            </div> -->
            <!-- End -->

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
          navigateToPage: 'home',
          navigateToText: 'Dashboard',
          fontAwesomeIcon: ['fas', 'tachometer-alt'],
          fontAwesomeStyle: { color: '#5bc0de' }
        },
        {
          appModule: 'internal',
          navigateToPage: 'internal',
          navigateToText: 'Internal',
          fontAwesomeIcon: ['fas', 'list'],
          fontAwesomeStyle: { color: '#28a745' }
        },

        {
          appModule: 'customers',
          navigateToPage: 'customers',
          navigateToText: 'Customers',
          fontAwesomeIcon: ['fas', 'project-diagram'],
          fontAwesomeStyle: { color: '#76ef04;' }
        },
        {
          appModule: 'system',
          navigateToPage: 'system',
          navigateToText: 'System',
          fontAwesomeIcon: ['fas', 'barcode'],
          fontAwesomeStyle: { color: '#76ef04;' }
        },

      ],
      // dropdownNavs: [
      //   {
      //     appModule: 'system',
      //     dropdownText: 'Settings',
      //     dropdownIcon: ['fas', 'cogs'],
      //     dropdownIconStyle: { color: '#9c27b0' },
      //     nestedLinks: [
      //       {
      //         navigateToPage: 'admin/buildings',
      //         navigateToText: 'Buildings'
      //       },
      //       {
      //         navigateToPage: 'admin/carriers',
      //         navigateToText: 'Carriers'
      //       },
      //       {
      //         navigateToPage: 'admin/contacts',
      //         navigateToText: 'Contacts'
      //       },
      //       {
      //         navigateToPage: 'admin/departments',
      //         navigateToText: 'Departments'
      //       },
      //       {
      //         navigateToPage: 'admin/floors',
      //         navigateToText: 'Floors'
      //       },
      //       {
      //         navigateToPage: 'admin/locations',
      //         navigateToText: 'Locations'
      //       },
      //       {
      //         navigateToPage: 'admin/securityRoles',
      //         navigateToText: 'Security Roles'
      //       },
      //       {
      //         navigateToPage: 'admin/users',
      //         navigateToText: 'Users'
      //       }
      //     ]
      //   }
      // ]
    }
  },

}
</script>

<style>
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

@media(max-width:992px){
  .small-screens-only{
    display:block
  }
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
