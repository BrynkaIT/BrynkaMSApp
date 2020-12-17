<template>
  <div class="content-container">
    <SideNav page="preferences" app="preferences"></SideNav>
    <div class="content-right">
      <h2>Preferences</h2>

      <div style="">
        <div class="row gutters-sm">
          <div class="col-md-4 d-none d-md-block">
            <div class="card">
              <div class="card-body">
                <nav class="nav flex-column nav-pills nav-gap-y-1">
                  <a
                    href="#"
                    @click="tabIndex = 0"
                    class="nav-item nav-link has-icon nav-link-faded"
                    :class="{ active: tabIndex == 0 }"
                  >
                    <b-icon icon="person" font-scale="1.5" class="mr-2"></b-icon
                    >Personal Information
                  </a>
                  <a
                    href="#"
                    @click="tabIndex = 1"
                    class="nav-item nav-link has-icon nav-link-faded"
                    :class="{ active: tabIndex == 1 }"
                  >
                    <b-icon icon="flag" font-scale="1.5" class="mr-2"></b-icon
                    >Your Location
                  </a>
                  <a
                    href="#"
                    @click="tabIndex = 2"
                    class="nav-item nav-link has-icon nav-link-faded"
                    :class="{ active: tabIndex == 2 }"
                  >
                    <b-icon
                      icon="shield-lock"
                      font-scale="1.5"
                      class="mr-2"
                    ></b-icon
                    >Security
                  </a>
                  <a
                    href="#"
                    @click="tabIndex = 3"
                    class="nav-item nav-link has-icon nav-link-faded"
                    :class="{ active: tabIndex == 3 }"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      class="feather feather-bell mr-2"
                    >
                      <path
                        d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"
                      ></path>
                      <path d="M13.73 21a2 2 0 0 1-3.46 0"></path></svg
                    >Notification
                  </a>
                </nav>
              </div>
            </div>
          </div>
          <div class="col-md-8">
            <b-card no-body>
              <b-tabs v-model="tabIndex" id="not-show-on-large-screens" card>
                <b-tab active>
                  <template v-slot:title>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      class="feather feather-user"
                    >
                      <path
                        d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"
                      ></path>
                      <circle cx="12" cy="7" r="4"></circle>
                    </svg>
                  </template>
                  <h6>YOUR PROFILE INFORMATION</h6>
                  <hr />
                  <PersonalInfo  :user="currentUser" @refresh="fetchUser" ></PersonalInfo>
                </b-tab>
                <b-tab>
                  <template v-slot:title>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      class="feather feather-settings"
                    >
                      <circle cx="12" cy="12" r="3"></circle>
                      <path
                        d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"
                      ></path>
                    </svg>
                  </template>
                  <h6>YOUR LOCATION</h6>
                  <hr />
                  <LocationInfo  :user="currentUser" @refresh="fetchUser"></LocationInfo>
                </b-tab>
                <b-tab>
                  <template v-slot:title>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      class="feather feather-shield"
                    >
                      <path
                        d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"
                      ></path>
                    </svg>
                  </template>
                  <h6>SECURITY SETTINGS</h6>
                  <hr />
                <SecurityInfo :user="currentUser" @refresh="fetchUser" :isCurrentUser="true"> </SecurityInfo>
                </b-tab>
                <b-tab>
                  <template v-slot:title>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      class="feather feather-bell"
                    >
                      <path
                        d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"
                      ></path>
                      <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
                    </svg>
                  </template>
                  <h6>NOTIFICATION SETTINGS</h6>
                  <hr />
                 <Notifications />
                </b-tab>
              </b-tabs>
            </b-card>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>

import SideNav from '@/components/shared/SideNav'
import { mapState } from 'vuex'
import vueMask from 'v-mask'
import PersonalInfo from '@/components/users/edituser/PersonalInfo'
import LocationInfo from '@/components/users/edituser/LocationInfo'
import SecurityInfo from '@/components/users/edituser/SecurityInfo'
import Notifications from '@/components/users/edituser/Notifications'
import { required, sameAs, minLength, email } from 'vuelidate/lib/validators'


export default {
  middleware: ['authenticated'],
  components: {
    SideNav,
    PersonalInfo,
    LocationInfo,
    Notifications,
    SecurityInfo
  },
  computed: {
    ...mapState({

    }),
      baseUrl(){
      return process.env.baseURL
    }
  },
  data() {
    return {
      disable: true,
      tabIndex: 0,
      currentUser:'',
      imagePlaceholder: '/img/avatar-placeholder.png'
    }
  },

  mounted(){
  this.currentUser = JSON.parse(localStorage.getItem('managerApp_currentUser'))

  },

  methods: {
    async fetchUser(id) {

      try {
        const { user } = await this.$store.dispatch('users/getUser',`${id}?deep=true`)
        localStorage.setItem('managerApp_currentUser', JSON.stringify(user));
        this.currentUser = user

      } catch (error) {
        this.$brynkaToast(error, 'danger')
      }
    },


  }
}
</script>
<style scoped>

.nav-link {
  color: #4a5568;
}
.nav-link.active {
  color: white !important;
}
.validation-error {
  border: 1px solid #f44336;
  color: red;
}
.validation-error::placeholder {
  /* Chrome, Firefox, Opera, Safari 10.1+ */
  color: red;
  opacity: 1; /* Firefox */
}

.validation-error:-ms-input-placeholder {
  /* Internet Explorer 10-11 */
  color: red;
}

::-ms-input-placeholder {
  /* Microsoft Edge */
  color: red;
}
</style>
