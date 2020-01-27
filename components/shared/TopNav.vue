<template>
  <div>
    <b-navbar toggleable="lg" type="dark" variant="dark">
      <b-navbar-brand>
        <nuxt-link to="/customers">
          <img src="/img/brynka/BrynkaManager-logo-sm.png" width="125px"/>
          <!-- SCT -->
        </nuxt-link>
      </b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav style="margin-left:10px !important;">
          <li>
            <nuxt-link to="/customers" class="nav-link">Customers</nuxt-link>
          </li>
          <b-nav-item href="#">Settings</b-nav-item>
          <b-nav-item href="#">Reports</b-nav-item>
          <b-nav-item-dropdown
            id="my-nav-dropdown"
            text="Tech"
            toggle-class="nav-link-custom"
            left
          >
            <b-dropdown-item>One</b-dropdown-item>
            <b-dropdown-item>Two</b-dropdown-item>
            <b-dropdown-divider></b-dropdown-divider>
            <b-dropdown-item>Three</b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>


        <!-- User Profile -->
        <b-navbar-nav class="ml-auto" v-if="$auth.loggedIn">
          <b-nav-item-dropdown right>
            <!-- Using 'button-content' slot -->
            <template v-slot:button-content>
              <span class="menu-icon">
                <img
                  style="max-width:32px; border-radius:360px;"
                  src="https://icon-library.net/images/avatar-icon-images/avatar-icon-images-4.jpg"
                />
              </span>
              <span class="menu-title">
                <i>{{ $auth.user.firstName }} {{ $auth.user.lastName }}</i>
              </span>
            </template>
            <!-- User Location Details -->
            <div class="pl-4">
              <h6>{{ this.$store.state.managedService.ManagedService.name | capFirstChar}}</h6>

              <h6>
              <span>
                <font-awesome-icon :icon="['fas', 'map-marker-alt']" style="color:#e41b00;font-size:12px" />
              </span>
              Langhorne</h6>
              <h6>
              <span> <font-awesome-icon :icon="['fas', 'building']" style="color:blue;font-size:12px" /> </span>
              HQ</h6>
            </div>
            <b-dropdown-divider></b-dropdown-divider>
            <b-dropdown-item href="#">Profile</b-dropdown-item>
            <b-dropdown-item @click="logout">Sign Out</b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script>
export default {
  methods: {
    async logout() {
      await this.$auth.logout()
      this.$router.push(`/${this.$store.state.managedService.ManagedService.name}`)
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
